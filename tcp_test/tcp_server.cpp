#include <arpa/inet.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <unistd.h>
#include <string.h>
#include <strings.h>
#include <stdio.h>
#include <sys/select.h>
#include "tcp_server.h"
#include <vector>
#include <fcntl.h>

using namespace std;

extern int errno;

int 
tcp_server::init(const char* ip, int listen_port, int backlog /* = 5 */)
{
    socket_fd_ = socket(AF_INET, SOCK_STREAM, 0);
    if(-1 == socket_fd_ ){
        printf("create socket failed:%s", strerror(errno));
        return -1;
    }

    //set non-block
    fcntl(socket_fd_, F_SETFL, O_NONBLOCK);
        
    printf("create socket succ\n");
    bzero(&svr_addr_, sizeof(svr_addr_));
    svr_addr_.sin_family = AF_INET;
    inet_pton(AF_INET, ip, &svr_addr_.sin_addr);
    svr_addr_.sin_port = htons(listen_port);

    int rv = bind(socket_fd_, (struct sockaddr*)&svr_addr_, sizeof(svr_addr_));
    if(-1 == rv) {
        printf("sock bind failed:%s\n",strerror(errno));
        return -1; 
    }
    printf("sock bind succ\n");

    rv = listen(socket_fd_, backlog);
    if(-1 == rv) {
        printf("listen %d failed:%s\n", socket_fd_, strerror(errno));
        return -1; 
    }
    printf("listen on port %d...\n", listen_port);

    return 0;
}



int 
tcp_server::test_loop()
{
    struct sockaddr_in client;
    socklen_t client_addr_len = sizeof(client);

    //buffer for read 
    char buf[1024];

    fd_set read_fds;
    vector<int> conn_fds;

    //add server listen sockect for select
    conn_fds.push_back(socket_fd_);

    while(1) {
        //read data if have.. noblock
        int maxfds = 0;
        FD_ZERO(&read_fds);
        for(size_t i=0; i < conn_fds.size(); ++i){
            FD_SET(conn_fds[i], &read_fds);
            maxfds = std::max(conn_fds[i], maxfds);
        }

        struct timeval tv;
        tv.tv_sec = 0;
        tv.tv_usec = 0;

        int ret = select(maxfds + 1, &read_fds, NULL, NULL, &tv);
        if(ret < 0) {
            printf("select failed:%d %s\n", ret, strerror(errno));
            continue;
        }

        for(size_t i=0; i < conn_fds.size(); ++i) {
            if(FD_ISSET(conn_fds[i], &read_fds)) {
                if(socket_fd_ == conn_fds[i]) { //a new connect received
                    int conn_fd = accept(socket_fd_, (struct sockaddr*)&client, &client_addr_len);    
                    if(conn_fd < 0) {
                        printf("accept from %d failed:%s", socket_fd_, strerror(errno));
                    } else {
                        char remote[64] = {0};
                        printf("connected from %s:%d accept as fd[%d].\n", 
                                inet_ntop(AF_INET, &client.sin_addr, remote, sizeof(remote)), 
                                ntohs(client.sin_port),
                                conn_fd
                              );
                        conn_fds.push_back(conn_fd);
                    }
                }else{
                    ret = recv(conn_fds[i], buf, sizeof(buf) - 1, 0);
                    if(ret <=0 ) {
                        printf("recv from fd[%d] break\n", conn_fds[i]);
                    }else {
                        printf("get %d bytes from fd[%d]|%s", ret, conn_fds[i], buf);
                    }
                }
            }
        }
    }
    return 0;
}
