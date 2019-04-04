package main

import (
    "fmt"
)


//定义一种类型
type Person struct  {
    Name string
    Sex string
}


func (p Person) Dump() {
    fmt.Printf("Name:%s, Sex:%s\n", p.Name, p.Sex)
}

//类似“继承”功能
type Chinese struct {
    Person
    ChineseName string
}

func (p Chinese) Dump() {
    p.Name = "haha" //如果传入的(p Chinese) 不使用指针，这里的修改对外是无效的。当需要修改对象的时候必须使用指针
    fmt.Printf("Chinese Name:%s, Sex:%s, ChineseName:%s\n", p.Name, p.Sex, p.ChineseName)
}

func main() {
    me := &Person{Name:"kevin", Sex:"Male"}
    me.Dump()

    //you := Chinese{Name:"kevin", Sex:"Male", ChineseName:"lin"} 这样初始化是不行的，会报错cannot use promoted field Person.Sex in struct literal of type Chinese
    //you := &Chinese{ Person{"kevin", "Male"}, ChineseName:"lin"} //ERROR: mixture of field:value and value initializers
    you := &Chinese{ Person{"kevin", "Male"}, "lin"} 
    you.Dump()
    fmt.Printf("Chinese Name:%s\n", you.Name)

}

