#include <memory>
#include <iostream>
 
//意义： 当shared_ptr需要传递时，不能返回裸指针，引用计数要继承。。

//enable_shared_from_this的使用
class Bad
{
public:
	std::shared_ptr<Bad> getptr() {
		return std::shared_ptr<Bad>(this);
	}
	~Bad() { std::cout << "Bad::~Bad() called" << std::endl; }
};
 

struct Good : std::enable_shared_from_this<Good> // 使用要点1）继承自enable_shared_from_this<T>
{
public:
	std::shared_ptr<Good> getptr() {
		return shared_from_this(); //使用要点2）在获取指针时，返回shared_from_this()
	}
	~Good() { std::cout << "Good::~Good() called" << std::endl; }
};

int main()
{
	// 错误的示例，每个shared_ptr都认为自己是对象仅有的所有者
	std::shared_ptr<Bad> bp1(new Bad());
	//std::shared_ptr<Bad> bp2 = bp1->getptr();   // Bad 对象将会被删除两次
    
    std::shared_ptr<Good> gp1(new Good());
    std::shared_ptr<Good> gp2 = gp1->getptr();
    // 打印gp1和gp2的引用计数
    std::cout << "gp1.use_count() = " << gp1.use_count() << std::endl;
    std::cout << "gp2.use_count() = " << gp2.use_count() << std::endl;

    //other： 如果要子类中使用shared_from_this(), 这里有注意事项：https://blog.csdn.net/u013745174/article/details/52900870
    return 0;
}


