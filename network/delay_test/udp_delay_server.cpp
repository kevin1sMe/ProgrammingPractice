/*========================================================================
#   FileName: udp_server.cpp
#     Author: kevinlin
#      Email: linjiang1205@qq.com
#   History:  a simple udp echo server 
#           为了测试recvfrom()中获得的sockaddr是否固定
# LastChange: 2014-05-07 23:03:53
========================================================================*/
#include <arpa/inet.h>
#include <errno.h>
#include <sys/types.h>          /* See NOTES */
#include <sys/socket.h>
#include <string.h>
#include <strings.h>


#include <stdio.h>

#define SERV_PORT 1986
#define MAX_LEN 1024

extern int errno;


void dg_echo(int sockfd, struct sockaddr *sockaddr, socklen_t addrlen);

int 
main(int argc, char** argv)
{
    int sockfd;
    struct sockaddr_in servaddr;
    struct sockaddr_in cliaddr;

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

    printf("sock bind succ\n");

    printf("begin recv...\n");

    dg_echo(sockfd, (sockaddr*)&cliaddr, sizeof(cliaddr));
    return 0;
}


void dg_echo(int sockfd, struct sockaddr *sockaddr, socklen_t addrlen)
{
    int n;
    socklen_t len;
    char msg[MAX_LEN] = {0};

    for(;;) {
        len = addrlen;
        n = recvfrom(sockfd, msg, sizeof(msg), 0, sockaddr, &len);
        if(-1 == n) {
            printf("recvfrom(%d) err:%s\n", sockfd, strerror(errno));
            break;
        }
        unsigned short port = ((struct sockaddr_in*)sockaddr)->sin_port;
        char* ip_addr = inet_ntoa(((struct sockaddr_in*)sockaddr)->sin_addr);
        //remove \n 
        //msg[strlen(msg) -1] = 0;
        printf("recv data from(%s:%d): len(%u)\n", ip_addr, port, len );
        sendto(sockfd, msg, n, 0, sockaddr, len);
    }
}

