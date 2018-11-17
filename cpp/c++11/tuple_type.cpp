#include <tuple>
#include <iostream>
#include <string>
#include <vector>

//tuple, 元组
//使用 std::get<n>来访问

int main()
{
    typedef std::tuple<std::string, int, bool> person;

    std::vector<person> p;
    p.push_back({"kevin", 32, true});
    p.push_back(std::make_tuple("li", 38, false));

    for(auto& i : p)
    {
        std::cout<<"name:"<<std::get<0>(i)<<std::endl
            <<"age:"<<std::get<1>(i)<<std::endl
            <<"sex:"<<(std::get<2>(i) ? "Male" : "Female")<<std::endl;
        
        //越界访问编译会报错
        //std::cout<<std::get<3>(i)<<std::endl;
    }
    
    return 0;
}
