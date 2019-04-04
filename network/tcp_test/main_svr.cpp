#include "tcp_server.h"
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>


int main(int argc, char** argv)
{
    if(argc < 3) {
        printf("Usage:%s listen_ip listen_port\n", argv[0]);
        return -1;
    }

    tcp_server svr;
    int rv = svr.init(argv[1], atoi(argv[2]));
    assert(0 == rv);

    svr.test_loop();
    
    return 0;
}
