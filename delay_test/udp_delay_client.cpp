/*========================================================================
#   FileName: udp_ntp_client.cpp
#     Author: kevinlin
#      Email: linjiang1205#qq.com
#   History:  NTP协议 的客户端，不停的发包，测试网络延迟
# LastChange: 2016-06-26 15:21:39
========================================================================*/
#include <arpa/inet.h>
#include <errno.h>
#include <fcntl.h>
#include <sys/types.h>          /* See NOTES */
#include <sys/socket.h>
#include <string.h>
#include <strings.h>
#include <stdlib.h>
#include <sys/time.h>
#include <pthread.h>
#include <unistd.h>

#include <stdio.h>


extern int errno;

#define MAX_LEN 1024

void dg_cli(int sockfd, const sockaddr* pservaddr, socklen_t len, int times, int interval);
void* send_proc(void*);
void* recv_proc(void*);


int sockfd;
struct sockaddr_in servaddr;

int send_times = 0;
int interval = 0;
int total_send = 0;
int total_recv = 0;

int main(int argc, char** argv)
{
    if(argc != 5){
        printf("usage: %s ipaddr port send_times send_interval(ms)\n", argv[0]);
        return -1;
    }
    
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(atoi(argv[2]));
    inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if(-1 == sockfd){
        printf("socket create failed:%s\n", strerror(errno));
        return -1;
    }

    int flags = fcntl(sockfd, F_GETFL, 0);
    if(flags < 0) {
        printf("fcntl F_GETFL failed:%s", strerror(errno));
        return -1;
    }
    if(fcntl(sockfd, F_SETFL, flags | O_NONBLOCK) < 0) {
        printf("fcntl F_SETFL failed:%s", strerror(errno));
        return -1;
    }

    send_times = atoi(argv[3]);
    interval = atoi(argv[4]);

    //发送线程
    pthread_t send_t, recv_t;
    pthread_create(&send_t, NULL, send_proc, NULL);
    pthread_create(&recv_t, NULL, recv_proc, NULL);
    //dg_cli(sockfd, (sockaddr*)&servaddr, sizeof(servaddr), atoi(argv[3]), atoi(argv[4]));

    pthread_join(send_t, NULL);
    sleep(2); //wait 10s for recv thread
    //pthread_join(recv_t, NULL);
    printf("\nTotal send:%d\nTotal recv:%d\nDropped:%d rate:%.2f%%\n", total_send, total_recv, total_send - total_recv, (total_send - total_recv) * 100.0 / total_send);
    return 0;
}

void* send_proc(void*)
{
    int n, len;
    const sockaddr* pservaddr = (sockaddr*)&servaddr;
    char sendline[MAX_LEN] = {0};
    for(int i=0; i < send_times; ++i){
        timeval tv1;
        gettimeofday(&tv1, NULL);
        uint64_t t1 = tv1.tv_sec * 1000000 + tv1.tv_usec;
        memcpy(sendline, &t1, sizeof(t1));

        int s = sendto(sockfd, sendline, sizeof(t1), 0, pservaddr, sizeof(servaddr));
        if(s == -1){
            printf("sendto failed:%s\n", strerror(errno));
            break;
        }
        ++total_send;
        //printf("send:%d\n", i);
        usleep(interval * 1000);
    }
}

void* recv_proc(void*)
{
    int n, len;
    char recvline[MAX_LEN] = {0};
    int count = 0;
    int empty_loop_count = 0;
    while(1){
        n = recvfrom(sockfd, recvline, MAX_LEN, 0, NULL, NULL);
        if(n < 0) {
            //printf("recvfrom err:%s\n", strerror(errno));
            empty_loop_count++;
            continue;
        }

        uint64_t recv_t1  = 0;
        memcpy(&recv_t1, &recvline[0], sizeof(recv_t1));

        timeval tv4;
        gettimeofday(&tv4, NULL);
        uint64_t t4 = tv4.tv_sec * 1000000 + tv4.tv_usec;
        printf("[%d] = {t1:%llu t4:%llu} delay:%llu ms\n", ++count, recv_t1, t4, (t4- recv_t1) / 1000);
        ++total_recv;

        if(empty_loop_count > 100)
        {
            empty_loop_count = 0;
            usleep(2000);
        }
    }
}


//void dg_cli(int sockfd, const sockaddr* pservaddr, socklen_t len, int times, int interval)
//{
    //int n;
    //char sendline[MAX_LEN] = {0};
    //char recvline[MAX_LEN + 1] = {0};

    //for(int i=0; i < times; ++i){
        //timeval tv1, tv4;
        //gettimeofday(&tv1, NULL);
        //uint64_t t1 = tv1.tv_sec * 1000000 + tv1.tv_usec;
        //memcpy(sendline, &t1, sizeof(t1));

        //int s = sendto(sockfd, sendline, sizeof(t1), 0, pservaddr, len);
        //if(s == -1){
            //printf("sendto failed:%s\n", strerror(errno));
            //break;
        //}

        //n = recvfrom(sockfd, recvline, MAX_LEN, 0, NULL, NULL);
        //if(n < 0) {
            //printf("[%d], recvfrom err\n", i);
            //continue;
        //}

        //uint64_t recv_t1  = 0;
        //memcpy(&recv_t1, &recvline[0], sizeof(recv_t1));
        //if(recv_t1 != t1) {
            //printf("\n[%d] = recv error[%llu != %llu]\n", i, t1, recv_t1);
            ////continue;
        //}

        //gettimeofday(&tv4, NULL);
        //uint64_t t4 = tv4.tv_sec * 1000000 + tv4.tv_usec;
        //printf("[%d] = {t1:%llu t4:%llu} delay:%llu ms\n", i, t1, t4, (t4- recv_t1) / 1000);

        //usleep(interval * 1000);
    //}
//}
