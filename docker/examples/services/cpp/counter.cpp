#include <sys/shm.h>
#include <iostream>
#include <errno.h>
#include <string.h>

extern int errno;

using namespace std;

int main()
{
    int shm_id = shmget(0x123456, 1024, IPC_CREAT|0600);
    void* mem = shmat(shm_id, NULL, 0);
    if(!mem)
    {
        cerr<<"shmat faled"
            <<strerror(errno)<<endl;
        return -1;
    }

    int* a_int = static_cast<int*>(mem);
    cout<<"counter:"<<*a_int<<endl;

    ++ (*a_int);

    return 0;
}
