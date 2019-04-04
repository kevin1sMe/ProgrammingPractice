/*========================================================================
#   FileName: tcp_delay_client.cpp
#     Author: kevinlin
#      Email: linjiang1205#qq.com
#   History:  tcp test client
# LastChange: 2016-07-17 22:01:12
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

void* send_proc(void*);
void* recv_proc(void*);

typedef struct tagPkg{
    int len;
    uint64_t t1;
}Pkg;

int sockfd;
struct sockaddr_in servaddr;
bool g_stop;

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

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if(-1 == sockfd){
        printf("socket create failed:%s\n", strerror(errno));
        return -1;
    }

    if(-1 == connect(sockfd, (sockaddr*)&servaddr, sizeof(servaddr))) {
        printf("connect failed, %s\n", strerror(errno));
        return -1;
    }

    send_times = atoi(argv[3]);
    interval = atoi(argv[4]);
    g_stop = false;

    //发送线程
    pthread_t send_t, recv_t;
    pthread_create(&send_t, NULL, send_proc, NULL);
    pthread_create(&recv_t, NULL, recv_proc, NULL);

    pthread_join(send_t, NULL);
    sleep(2); //wait second for recv thread
    printf("\nTotal send:%d\nTotal recv:%d\nDropped:%d rate:%.2f%%\n", 
            total_send, total_recv, total_send - total_recv, (total_send - total_recv) * 100.0 / total_send);

    g_stop = true;
    close(sockfd);
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

        int s = write(sockfd, sendline, sizeof(t1));
        if(s == -1){
            printf("write failed:%s\n", strerror(errno));
            break;
        }
        ++total_send;
        //printf("send:%d\n", i);
        usleep(interval * 1000);
    }
    return NULL;
}

void* recv_proc(void*)
{
    int n, len;
    char recvline[MAX_LEN] = {0};
    int count = 0;
    int empty_loop_count = 0;
    while(!g_stop){
        n = read(sockfd, recvline, sizeof(recvline));
        if(n <= 0) {
            printf("recvfrom err:%s\n", strerror(errno));
            continue;
        }

        for(int i=0; i < n; i += sizeof(uint64_t)) {
            uint64_t recv_t1  = 0;
            memcpy(&recv_t1, &recvline[i], sizeof(uint64_t));
            timeval tv4;
            gettimeofday(&tv4, NULL);
            uint64_t t4 = tv4.tv_sec * 1000000 + tv4.tv_usec;
            printf("[%d] = {t1:%llu t4:%llu} delay:%llu ms\n", ++count, recv_t1/1000, t4/1000, (t4- recv_t1) / 1000);
            ++total_recv;
        }
    }
    return NULL;
}

