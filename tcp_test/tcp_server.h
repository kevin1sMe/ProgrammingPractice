/*========================================================================
#   FileName: tcp_server.h
#     Author: kevinlin
#      Email: linjiang1205@qq.com
#   History:  封装一个简单的tcpserver 的 api
            利用select()读取不同fd数据
# LastChange: 2014-10-20 23:05:24
========================================================================*/
#include <arpa/inet.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <string.h>
#include <strings.h>


#include <stdio.h>

class tcp_server
{
public:
    int init(const char* ip, int listen_port, int backlog = 5);

    int test_loop();
private:
    int socket_fd_;
    sockaddr_in svr_addr_;
};

