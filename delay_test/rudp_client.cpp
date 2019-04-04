/*========================================================================
#   FileName: rudp_delay_client.cpp
#     Author: kevinlin
#      Email: linjiang1205#qq.com
#   History:  通过冗余保证可靠的udp传输
# LastChange: 2016-08-01 15:21:59
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
#include <vector>


//#define DEBUG 

extern int errno;
using namespace std;

#define MAX_LEN 1024

void* send_proc(void*);
void* recv_proc(void*);

int sockfd;
struct sockaddr_in servaddr;

int send_times = 0;
int interval = 0;
int total_send_pkg = 0;
int total_recv_pkg = 0;
int total_send_times = 0;
int total_recv_times = 0;


int client_seq = 0;
int server_seq = 0;
int server_ack = 0;

bool all_data_product = false;

//这里缓存着要发送的数据列表，数据为时间戳
vector<uint64_t> data_list; 

static pthread_mutex_t lock;

typedef struct tagUdpPkg {
    int32_t seq;
    int32_t ack;
    int32_t len;
    uint64_t data[0];
}UdpPkg;

int main(int argc, char** argv) {
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

    pthread_mutex_init(&lock, NULL);

    //发送线程
    pthread_t send_t, recv_t;
    pthread_create(&send_t, NULL, send_proc, NULL);
    pthread_create(&recv_t, NULL, recv_proc, NULL);

    pthread_join(send_t, NULL);
    sleep(2); //wait second for recv thread
    printf("\nTotal send pkg:%d\nTotal recv pkg:%d\nTotal send times:%d\nTotal recv times:%d Dropped:%d rate:%.2f%%\n", 
            total_send_pkg, total_recv_pkg, 
            total_send_times, total_recv_times,
            total_send_pkg - total_recv_pkg, 
            (total_send_pkg - total_recv_pkg) * 100.0 / total_send_pkg);

    pthread_mutex_destroy(&lock);
    return 0;
}

uint64_t now(){
    timeval tv1;
    gettimeofday(&tv1, NULL);
    return tv1.tv_sec * 1000000 + tv1.tv_usec;
}

//向队列中写入一些待发送数据 
void add_data_to_list(int* remain_times) {
    if(*remain_times > 0){
        -- *remain_times;
        //加入新数据
        pthread_mutex_lock(&lock);
        {
            data_list.push_back(now());
            ++client_seq;
            ++total_send_pkg;
#ifdef DEBUG
            printf("[%d]add new data to list\n", client_seq);
#endif
        }
        pthread_mutex_unlock(&lock);
    } else{
        all_data_product = true;
    }
}


void* send_proc(void*) {
    int n, len;
    const sockaddr* pservaddr = (sockaddr*)&servaddr;
    char sendline[MAX_LEN] = {0};

    while(true) {
        //加入数据 
        add_data_to_list(&send_times);

        pthread_mutex_lock(&lock);
        if(all_data_product && data_list.empty()) {
            printf("all data send and recv succ, stop send thread.\n");
            break;
        }
        //组建发送包
        UdpPkg* pkg = (UdpPkg*)sendline;
        pkg->seq = htonl(client_seq);
        pkg->ack = htonl(server_seq);

        int len = data_list.size() > 100 ? 100: data_list.size();
        pkg->len = htonl(len);
        for(int idx=0; idx < len; ++idx ){
            memcpy(pkg->data + idx, &data_list[idx], sizeof(data_list[0]) * len);
        }

        int total_len = sizeof(UdpPkg) + sizeof(pkg->data[0]) * len;

        int s = sendto(sockfd, sendline, total_len, 0, pservaddr, sizeof(servaddr));
        if(s == -1){
            printf("sendto failed:%s\n", strerror(errno));
            break;
        }
        ++total_send_times;
        pthread_mutex_unlock(&lock);
#ifdef DEBUG
        printf("[%d] send data to server {seq:%d ack:%d len:%d}\n",
                total_send_times, client_seq, server_seq, len);
#endif
        usleep(interval * 1000);
    }
    return NULL;
}

void* recv_proc(void*) {
    int n, len;
    char recvline[MAX_LEN] = {0};
    int count = 0;
    int empty_loop_count = 0;
    while(1){
        n = recvfrom(sockfd, recvline, MAX_LEN, 0, NULL, NULL);
        if(n < 0) {
            empty_loop_count++;
            continue;
        }

        pthread_mutex_lock(&lock);
        ++total_recv_times;

        if(n < sizeof(UdpPkg)) {
            printf("recv len:%d less than UdpPkg\n", n);
            continue;
        }

        UdpPkg* recv_data = (UdpPkg*)recvline;
        int recv_seq = ntohl(recv_data->seq);
        if(recv_seq < server_seq) {
            printf("recv seq:%d server_seq:%d expire data size:%d, drop it\n", recv_seq, server_seq, n);
            continue;
        }

        int recv_ack = ntohl(recv_data->ack);
        int recv_len = ntohl(recv_data->len);
 
#ifdef DEBUG
        printf("recv from server recv:{seq:%d ack:%d len:%d}, old:{server_seq:%d, server_ack:%d} client:{seq:%d} \n", 
               recv_seq, recv_ack, recv_len,  server_seq, server_ack, client_seq);
#endif
        server_seq = recv_seq;
        server_ack = recv_ack;
        //计算哪一些被确认，剩下的留在队列中
        int unack_count = client_seq - server_ack;

        int drop_count = data_list.size() - unack_count;
        if(drop_count < 0) {
            printf("drop count less than 0, data_list_size:%ld unack_count:%d\n", data_list.size(), unack_count);
            continue;
        }

        uint64_t t = now();
        for(vector<uint64_t>::iterator it = data_list.begin(); 
                it != data_list.end() && it != data_list.begin() + drop_count; 
                ++it) {
            ++total_recv_pkg;
            uint64_t data = *it;
            printf("recv from server, [%d] = {t1:%llu t4:%llu} delay:%llu ms\n", ++count, data, t, (t- data) / 1000);
        }

        data_list.erase(data_list.begin(),data_list.begin() + drop_count);
        pthread_mutex_unlock(&lock);

        if(empty_loop_count > 100) {
            empty_loop_count = 0;
            usleep(2000);
        }
    }
    return NULL;
}

