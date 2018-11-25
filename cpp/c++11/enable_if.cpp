#include <type_traits>
#include <iostream>
#include <string>

using namespace std;
//1. SFNIAE 规则：Substitution Failure Is Not An Error
//2. enable_if的原理。 (https://blog.csdn.net/Kiritow/article/details/50932012)
//定义了两个版本：
/*
 * 普通版本，里面啥也不做，对比下面的偏特化版本，Cond=true时匹配下面
template<bool Cond, class T = void>
struct enable_if {};
 
偏特化版本, 如果条件为true, 则此模版定义了typedef了类型T
template<class T>
struct enable_if<true, T> { typedef T type; };

*/

long multiply(int i, int j) { return i * j; }

//template <class T>
//typename T::multiplication_result multiply(T t1, T t2)
//{
    //return t1 * t2;
//}

template <class T>
typename T::xxx multiply(T t1, T t2)
{
    return t1 * t2;
}


//call-1
template < class T,
           class = typename std::enable_if<std::is_integral<T>::value>::type> 
         //  typename std::enable_if<std::is_integral<T>::value, int>::type = 0 > // ok, this ==> typename int = 0
void call (T i) {
    cout<<"call() for type integeral"<<endl;
}



//call-2
void call(std::string i){
     cout<<"special call() for string"<<endl;
}


class A{};

int main(void)
{
    multiply(4, 5); //不会报错，因为有可以匹配的, 见：SFNIAE

    typename enable_if<true, int>::type t1;
    cout<<typeid(t1).name()<<endl;

    //typename std::enable_if<true>::type t2; //error: incomplete type is not allowed， 原因是第二个参数使用默认void,即对void t2的报错。
    //    void t3;      //上面的实际声明

    // typename enable_if<std::is_integral<int>::value>::type t2; //error: incomplete type is not allowed， 同上
    //上面这种写法，在模板类声明中可使用， 类似于下面示例： class  = typename std::enable_if<std::is_integral<T>::value>::type>

    //typename enable_if<false>::type t2; //error: has no member 'type'
    std::cout << std::boolalpha;
    
    call(10); //匹配 call-1
    call("string"); //匹配call-2
    //call(1.2);  //error: 无匹配项，注意无法匹配call-1, 
                //因为class  = typename std::enable_if<std::is_integral<T>::value>::type>仅当T为integral时才有type才是合法定义, 
                //不然没有此定义（SFNIAE 规则允许无定义）

    // call(nullptr);
    return 0;
}
