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
#include <stdlib.h>


#include <stdio.h>

#define MAX_LEN 1024

extern int errno;
using namespace std;

void* send_proc(void*);
void loop(int sockfd, struct sockaddr *sockaddr, socklen_t addrlen);

int seq = 0;
int ack = 0;
int client_seq = 0;
int client_ack = 0;
int send_times = 0;

int sockfd;
struct sockaddr_in cliaddr;

typedef struct tagUdpPkg {
    int32_t seq;
    int32_t ack;
    int32_t len;
    uint64_t data[0];
}UdpPkg;

void reset() {
    seq = 100;
    ack = 0;
    client_seq = 0;
    client_ack = 0;
}

int main(int argc, char** argv) {
    if(argc < 2) {
        printf("Usage:%s port\n", argv[0]);
        return -1;
    }
    struct sockaddr_in servaddr;

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if(-1 == sockfd ){
        printf("create socket failed:%s", strerror(errno));
        return -1;
    }
        
    int port = atoi(argv[1]);
    printf("create socket on port:%d succ\n", port);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(port);

    int rv = bind(sockfd, (sockaddr*)&servaddr, sizeof(servaddr));
    if(-1 == rv) {
        printf("sock bind failed:%s\n",strerror(errno));
        return -1; 
    }

    printf("sock bind on port:%d succ\n", port);

    //发送线程
    pthread_t send_t;
    pthread_create(&send_t, NULL, send_proc, NULL);

    loop(sockfd, (sockaddr*)&cliaddr, sizeof(cliaddr));
    return 0;
}

char* binary_dump(const char* src, size_t len) {
    const int max_buff = 1024;
    const int char_per_byte = 3;
    static char buf[max_buff * char_per_byte + 1] = {0};
    if(len > max_buff) {
        len = max_buff;    
    }

    for(size_t i=0; i < len; ++i) {
        snprintf(buf + (i * char_per_byte), char_per_byte + 1, "%02hhX", src[i]);
    }
    if(0 == len) {
        buf[0] = 0;
    }
    return buf;
}

void loop(int sockfd, struct sockaddr *sockaddr, socklen_t addrlen) {
    printf("recv start...\n");
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
            reset();
            printf("new session, reset seq/ack\n");
            cliaddr = client_addr;
        }

        UdpPkg* recv_data = (UdpPkg*)msg;
        int recv_seq = ntohl(recv_data->seq);
   
        if(recv_seq < client_seq) {
            printf("recv expire data{recv_seq:%d client_seq:%d} size:%d, data:{%s} drop it\n", 
                    recv_seq, client_seq, n, binary_dump(msg, n));
            continue;
        }

        int recv_ack = ntohl(recv_data->ack);
        int recv_len = ntohl(recv_data->len);

        printf("recv client data (recv_seq:%d client_seq:%d ack:%d len:%d data:%s)\n", 
                recv_seq, client_seq, recv_ack, recv_len, binary_dump(msg, n));
        client_seq = recv_seq;
        client_ack = recv_ack;
        send_times = 0;
    }
}


void* send_proc(void*) {
    printf("send thread start...\n");
    int n, len;
    char sendline[MAX_LEN] = {0};
    for(;;){
        if(client_ack < client_seq && send_times < 10){
            ++send_times; //发10次最多
            //组建发送包
            UdpPkg* pkg = (UdpPkg*)sendline;
            pkg->seq = htonl(client_seq);
            pkg->ack = htonl(client_seq);
            pkg->len = htonl(0);

            int total_len = sizeof(UdpPkg);
            sendto(sockfd, sendline, total_len, 0, (struct sockaddr*)&cliaddr, sizeof(cliaddr));
            printf("send to client, client_seq:%d client_ack:%d\n", client_seq, client_ack);
            usleep(4 * 1000);
        }
        else{
            usleep(10 * 1000);
        }
    }
    return NULL;
}

