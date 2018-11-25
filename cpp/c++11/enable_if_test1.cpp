#include <iostream>

//enable_if可以作为参数或返回值加到函数中，我们看具体的例子： 1. 作为参数传入 我们在函数参数里多加了一个参数作推导用
//http://www.fuzihao.org/blog/2016/07/14/C-enable-if%E7%9A%84%E4%BD%BF%E7%94%A8/

using namespace std;

template<bool B, class T = void>
    struct user_enable_if {};
template<class T>
struct user_enable_if<true, T> { typedef T type; };

struct A{};

template<typename T>
struct Traits{
    static const bool is_basic = true;
};

template<>
struct Traits<A>{
    static const bool is_basic = false;
};

template<typename T>
void f(T a, typename user_enable_if<Traits<T>::is_basic, void>::type* dump= 0){
    (void)a; 
    (void)dump;
    cout<<"a basic type"<<endl;
}

template<typename T>
void f(T a, typename user_enable_if<!Traits<T>::is_basic, void>::type* dump= 0){
    (void)a;
    (void)dump;
    cout<<"a class type"<<endl;
}

int main(){
    A a;
    f(1);
    f(a);
}
