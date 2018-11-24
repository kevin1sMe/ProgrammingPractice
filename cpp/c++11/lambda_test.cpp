#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <thread>

//loambda 的一些使用测试


using namespace std;

template<class T>
void print_vector(const vector<T>& vec, string comment = "")
{
    cout<<"========="<< comment <<" begin ============"<<endl;
    for(auto& p : vec)
    {
        cout<<p.ToString()<<endl;
    }
    cout<<"========="<< comment <<" end ============"<<endl;
}

int main()
{
    struct Person{
        string name;
        int age;

        string ToString()const
        {
            return "name:" + name + ", age:" + to_string(age);
        }
    };

    vector<Person> persons = {{"kevin", 30}, {"lin", 20}, {"jiang", 25}};
    print_vector(persons, "original");

    //按年龄排序
    sort(persons.begin(), persons.end(), [](const Person& a, const Person& b)-> bool { return a.age > b.age; });
    print_vector(persons, "sorted");

    //找到名为lin的人, 使用全局值捕获
    string find_name = "lin";
    auto lin = std::find_if(persons.begin(), persons.end(), [=](const Person& a) { return a.name == find_name; });
    if(lin != persons.end())
    {
        cout<<"find person:"<<find_name<<endl
            <<lin->ToString()<<endl;
    }

    cout<<"======================"<<endl;
    //找到名为jiang的人, 使用指定值捕获
    find_name = "jiang";
    auto jiang = std::find_if(persons.begin(), persons.end(), [find_name](const Person& a) { return a.name == find_name; });
    if(jiang != persons.end())
    {
        cout<<"find person:"<<find_name<<endl
            <<jiang->ToString()<<endl;
    }


    cout<<"======================"<<endl;

    //统计[20,30)岁之间的人数, 使用值加引用捕获
    int age_begin = 20, age_end = 30;
    cout<<"age between "<<age_begin<< " and " <<age_end<<" count:"
        <<std::count_if(persons.begin(), persons.end(), 
                [age_begin, &age_end](const Person& a) { 
                    return a.age >= age_begin && a.age < age_end; 
                    }) <<endl;

    //多线程，函数. 当参数为空时，可以省略()
    thread t([]{cout<<"hello world"<<endl; });
    t.join();
    return 0;

}
