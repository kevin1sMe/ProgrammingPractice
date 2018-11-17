#include <vector>
#include <iostream>

//1. 返回值型别尾序语法(后置返回值类型)。
//见这里模版的auto + decltype。其中auto和类型推导没有任何关系。它只为说明这里使用返回值型别尾序语法。
//即函数返回值类型将在形参列表之后(在 -> 之后)。 主要特性是使用形参中的类型。
//
//decltype在这里，用于类型声明. C++11中需要这种写法，C++14中可以省略而通过类型推导获得返回类型。
//
//decltype_test.cpp:11:1: error: 'auto' return without trailing return type; deduced return types are a C++14 extension

//C++11
template<typename Container, typename Index>
auto authAndAccess(Container& c, Index i) -> decltype(c[i])
{
    return c[i];
}

//C++14
//template<typename Container, typename Index>
//decltype(auto) authAndAccess(Container& c, Index i)
//{
    //return c[i];
//}

int main()
{
    std::vector<int> v = { 1, 3, 5, 7, 9};
    std::cout<<authAndAccess(v, 1) << std::endl;

    return 0;
}
