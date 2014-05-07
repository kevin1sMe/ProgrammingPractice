#include <arpa/inet.h>
#include <errno.h>
#include <sys/types.h>          /* See NOTES */
#include <sys/socket.h>
#include <string.h>
#include <strings.h>

#include <stdio.h>


extern int errno;

#define SERV_PORT 1986
#define MAX_LEN 1024

void 
dg_cli(FILE* fp, int sockfd, const sockaddr* pservaddr, socklen_t len);

int 
main(int argc, char** argv)
{
    if(argc != 2){
        printf("usage: %s ipaddr\n", argv[0]);
        return -1;
    }

    int sockfd;
    struct sockaddr_in servaddr;
    
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if(-1 == sockfd){
        printf("socket create failed:%s\n", strerror(errno));
        return -1;
    }

    dg_cli(stdin, sockfd, (sockaddr*)&servaddr, sizeof(servaddr));

    return 0;
}

void 
dg_cli(FILE* fp, int sockfd, const sockaddr* pservaddr, socklen_t len)
{
    int n;
    char sendline[MAX_LEN] = {0};
    char recvline[MAX_LEN + 1] = {0};

    while(fgets(sendline, MAX_LEN, fp) != NULL){
        //printf("req: len(%lu) %s\n", strlen(sendline), sendline);
        int s = sendto(sockfd, sendline, strlen(sendline), 0, pservaddr, len);
        if(s == -1){
            printf("sendto failed:%s\n", strerror(errno));
            break;
        }

        n = recvfrom(sockfd, recvline, MAX_LEN, 0, NULL, NULL);
        recvline[n] = 0;
        fputs(recvline, stdout);
    }
}
