/*========================================================================
#   FileName: rudp_delay_server.cpp
#     Author: kevinlin
#      Email: linjiang1205@qq.com
#   History:  简易可靠udp实现server端
# LastChange: 2016-08-01 16:39:19
========================================================================*/
#include <arpa/inet.h>
#include <errno.h>
#include <sys/types.h>          /* See NOTES */
#include <sys/socket.h>
#include <string.h>
#include <strings.h>
#include <vector>
#include <pthread.h>
#include <unistd.h>


#include <stdio.h>

#define SERV_PORT 1986
#define MAX_LEN 1024

extern int errno;

using namespace std;

void loop(int sockfd, struct sockaddr *sockaddr, socklen_t addrlen);

void* send_proc(void*);

int seq = 0;
int ack = 0;
int last_ack_send = 0;


typedef struct tagUdpPkg
{
    int32_t seq;
    int32_t ack;
    int32_t len;
    uint64_t data[0];
}UdpPkg;

vector<uint64_t> data_list; //这里缓存着要发送的数据列表，数据为时间戳

int sockfd;
struct sockaddr_in cliaddr;

int main(int argc, char** argv)
{
    struct sockaddr_in servaddr;

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if(-1 == sockfd ){
        printf("create socket failed:%s", strerror(errno));
        return -1;
    }
        
    printf("create socket succ\n");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    int rv = bind(sockfd, (sockaddr*)&servaddr, sizeof(servaddr));
    if(-1 == rv) {
        printf("sock bind failed:%s\n",strerror(errno));
        return -1; 
    }

    printf("sock bind on port:%d succ\n", SERV_PORT);

    printf("begin recv...\n");

    //发送线程
    pthread_t send_t;
    pthread_create(&send_t, NULL, send_proc, NULL);

    loop(sockfd, (sockaddr*)&cliaddr, sizeof(cliaddr));
    return 0;
}


void loop(int sockfd, struct sockaddr *sockaddr, socklen_t addrlen)
{
    int n;
    socklen_t len;
    char msg[MAX_LEN] = {0};

    for(;;) {
        len = addrlen;
        struct sockaddr_in client_addr;
        n = recvfrom(sockfd, msg, sizeof(msg), 0, (struct sockaddr*)&client_addr, &len);
        if(-1 == n) {
            printf("recvfrom(%d) err:%s\n", sockfd, strerror(errno));
            break;
        }
        if(n < sizeof(UdpPkg)) {
            printf("recv size:%d less than UdpPkg\n", n);
            continue;
        }

        if(memcmp(&cliaddr, &client_addr, sizeof(client_addr)) != 0){
            seq = 0;
            ack = 0;
            last_ack_send = 0;
            printf("new session, reset seq/ack\n");
            cliaddr = client_addr;
        }


        UdpPkg* recv_data = (UdpPkg*)msg;
        int recv_seq = ntohl(recv_data->seq);
   
        if(recv_seq < ack) {
            printf("recv expire data size:%d, drop it\n", n);
            continue;
        }

        int recv_ack = ntohl(recv_data->ack);
        int recv_len = ntohl(recv_data->len);

        printf("cur ack:%d, recv data (seq:%d ack:%d len:%d)\n", ack, recv_seq, recv_ack, recv_len);
        ack = recv_seq; //客户端过来的seq, 保存在服务器下发的ack中

        //unsigned short port = ((struct sockaddr_in*)sockaddr)->sin_port;
        //char* ip_addr = inet_ntoa(((struct sockaddr_in*)sockaddr)->sin_addr);
        //sendto(sockfd, msg, n, 0, sockaddr, len);
    }
}


void* send_proc(void*)
{
    int n, len;
    char sendline[MAX_LEN] = {0};
    for(;;){
        if(last_ack_send < ack){
            ++seq;
            //组建发送包
            UdpPkg* pkg = (UdpPkg*)sendline;
            pkg->seq = htonl(seq);
            pkg->ack = htonl(ack);
            pkg->len = htonl(0);
            int total_len = sizeof(UdpPkg);
            sendto(sockfd, sendline, total_len, 0, (struct sockaddr*)&cliaddr, sizeof(cliaddr));
            last_ack_send = ack;
            printf("sendback seq:%d ack:%d len:%d\n", seq, ack, 0);
            //usleep(10 * 1000);
        }
        else{
            usleep(10 * 1000);
        }
    }
    return NULL;
}

