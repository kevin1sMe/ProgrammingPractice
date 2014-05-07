/*========================================================================
#   FileName: mempool.h
#     Author: kevinlin
#      Email: linjiang1205@qq.com
#   History:  a mempool , as you can see, it's not a thread-safe lib
# LastChange: 2014-05-07 23:31:10
========================================================================*/
#ifndef _MEM_POOL_H_
#define _MEM_POOL_H_

#include <stdio.h>
#include <stddef.h>


struct node{
    node* next;
    char  data[0];
};


template <typename T>
class mempool 
{
public:
    mempool(void *mem, size_t sz) :
        mem_header_((char*)mem),
        mem_sz_(sz),
        alloc_header_((char*)mem),
        free_list_header_(NULL) 
    {
    }

    T* malloc(bool be_zero = true) {
        //first, alloc from free_list
        if(free_list_header_){
            return _malloc_from_free_list();
        }
        //then..
        return _malloc_from_mem();
    }


    void free(const T* n) {
        node* p = (node*)((char*)n - offsetof(node, data));
        p->next = (node*)free_list_header_ ;
        free_list_header_ = (char*)p;
    }

private:
    T* _malloc_from_mem() {
        node* n = (node*)alloc_header_;

        //将alloc_header_后移，是否需要字节对齐？
        alloc_header_ += sizeof(node) + sizeof(T);

        //check out of memory
        if(alloc_header_ - mem_header_ > mem_sz_){
            return NULL;
        }

        n->next = (node*)alloc_header_;

        return (T*)n->data;
    }

    T* _malloc_from_free_list() {
        node *p = (node*)free_list_header_;
        free_list_header_ = (char*)p->next;
        return (T*)p->data;
    }



private:
    char    *mem_header_;
    size_t  mem_sz_; 

    char    *alloc_header_;
    char    *free_list_header_;
};


#endif

