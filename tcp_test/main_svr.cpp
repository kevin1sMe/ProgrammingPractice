#include "tcp_server.h"
#include <stdio.h>
#include <assert.h>


int main()
{
    tcp_server svr;
    int rv = svr.init("127.0.0.1", 1986);
    assert(0 == rv);

    svr.test_loop();
    
    return 0;
}
