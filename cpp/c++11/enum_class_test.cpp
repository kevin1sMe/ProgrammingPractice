#include <tuple>
#include <iostream>
#include <string>
#include <vector>

//不限范围，名字污染
//enum FieldName { Name, Age, Sex};

//限定范围，这些Name,Age,Sex都在FieldName名字空间之下
enum class FieldName { Name, Age, Sex};

int main()
{
    typedef std::tuple<std::string, int, bool> person;

    std::vector<person> p;
    p.push_back({"kevin", 32, true});
    p.push_back(std::make_tuple("li", 38, false));

    for(auto& i : p)
    {
        //这个算不限范围enum惟一可继续用武之处，其它都建议使用限定范围
        //使用不限范围的enum， 可直接被隐式转换为std::get所需要的下标数值
        //std::cout<<"name:"<<std::get<FieldName::Name>(i)<<std::endl
            //<<"age:"<<std::get<FieldName::Age>(i)<<std::endl
            //<<"sex:"<<(std::get<FieldName::Sex>(i) ? "Male" : "Female")<<std::endl;
            
         //使用enum class则需要显式转换了
         std::cout<<"name:"<<std::get<static_cast<std::size_t>(FieldName::Name)>(i)<<std::endl
            <<"age:"<<std::get<static_cast<std::size_t>(FieldName::Age)>(i)<<std::endl
            <<"sex:"<<(std::get<static_cast<std::size_t>(FieldName::Sex)>(i) ? "Male" : "Female")<<std::endl;
        
    }
    
    return 0;
}
