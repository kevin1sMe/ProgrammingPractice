#include <iostream>
#include <string>
#include <memory>

using namespace std;

struct A{
    int a;
    string b;

    A():a(0),b("")
    {
        cout<<typeid(*this).name()<<" ctor called"<<endl;
    }
    ~A()
    {
        cout<<"~"<<typeid(*this).name()<<" dtor called: {"<<a<<","<<b<<"}"<<endl;
    }
};

class B : public A {};

//智能指针的一些测试
int main()
{
    //A() called()
    //~A() called()
    std::shared_ptr<A> ptr(new A());
    ptr->a = 12;

    //std::shared_ptr<A> ptrB = new A();  //error, 错误！ 不会进行隐式转换，类型不符合
    std::shared_ptr<A> ptrB = make_shared<A>();
    ptrB->b = "test";
    cout<<"ptrB use count:"<<ptrB.use_count()<<endl;

    //std::shared_ptr<A> ptrArray = make_shared<A>(10);
    //数组, 需要自行传删除器
    //std::shared_ptr<A> sp( new A[10], std::default_delete<A[]>() ); //ok

    //std::shared_ptr<A> sp2( new A[10], [](A* p){delete[] p;} ); //ok

    //unique_ptr
    std::unique_ptr<B> up1(new B());
    ptr->a = 12;
    std::unique_ptr<B[]> upArray(new B[10]); //ok , 使用unique对于数组的特殊优化，不用传deleter
    upArray[5].a = 34;
    upArray[6].b = "get";


    return 0;
}
