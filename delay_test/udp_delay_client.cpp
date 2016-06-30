/*========================================================================
#   FileName: udp_ntp_client.cpp
#     Author: kevinlin
#      Email: linjiang1205#qq.com
#   History:  NTP协议 的客户端，不停的发包，测试网络延迟
# LastChange: 2016-06-26 15:21:39
========================================================================*/
#include <arpa/inet.h>
#include <errno.h>
#include <sys/types.h>          /* See NOTES */
#include <sys/socket.h>
#include <string.h>
#include <strings.h>
#include <stdlib.h>
#include <sys/time.h>
#include <unistd.h>

#include <stdio.h>


extern int errno;

#define MAX_LEN 1024

void dg_cli(int sockfd, const sockaddr* pservaddr, socklen_t len, int times, int interval);

int main(int argc, char** argv)
{
    if(argc != 5){
        printf("usage: %s ipaddr port send_times send_interval(ms)\n", argv[0]);
        return -1;
    }

    int sockfd;
    struct sockaddr_in servaddr;
    
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(atoi(argv[2]));
    inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if(-1 == sockfd){
        printf("socket create failed:%s\n", strerror(errno));
        return -1;
    }

    dg_cli(sockfd, (sockaddr*)&servaddr, sizeof(servaddr), atoi(argv[3]), atoi(argv[4]));

    return 0;
}

void dg_cli(int sockfd, const sockaddr* pservaddr, socklen_t len, int times, int interval)
{
    int n;
    char sendline[MAX_LEN] = {0};
    char recvline[MAX_LEN + 1] = {0};

    for(int i=0; i < times; ++i){
        timeval tv1, tv4;
        gettimeofday(&tv1, NULL);
        uint64_t t1 = tv1.tv_sec * 1000000 + tv1.tv_usec;
        memcpy(sendline, &t1, sizeof(t1));

        int s = sendto(sockfd, sendline, sizeof(t1), 0, pservaddr, len);
        if(s == -1){
            printf("sendto failed:%s\n", strerror(errno));
            break;
        }

        n = recvfrom(sockfd, recvline, MAX_LEN, 0, NULL, NULL);
        if(n < 0) {
            printf("[%d], recvfrom err\n", i);
            continue;
        }

        uint64_t recv_t1  = 0;
        memcpy(&recv_t1, &recvline[0], sizeof(recv_t1));
        if(recv_t1 != t1) {
            printf("\n[%d] = recv error[%llu != %llu]\n", i, t1, recv_t1);
            //continue;
        }

        gettimeofday(&tv4, NULL);
        uint64_t t4 = tv4.tv_sec * 1000000 + tv4.tv_usec;
        printf("[%d] = {t1:%llu t4:%llu} delay:%llu us\n", i, t1, t4, t4- recv_t1);

        usleep(interval * 1000);
    }
}
