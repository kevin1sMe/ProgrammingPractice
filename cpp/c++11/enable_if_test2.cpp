#include <iostream>

//enable_if
//有时后我们对参数个数有限制（例如，我们是重载的operator函数，参数个数被严格限制），这时候我们可以把enable_if加到返回值上。 1. 作为返回值 代码如下：
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
typename user_enable_if<Traits<T>::is_basic, T>::type f(T a){
    cout<<"a basic type"<<endl;
    return a;
}

template<typename T>
typename user_enable_if<!Traits<T>::is_basic, T>::type f(T a){
    cout<<"a class type"<<endl;
    return a;
}

int main(){
    A a;
    f(1);
    f(a);
}
