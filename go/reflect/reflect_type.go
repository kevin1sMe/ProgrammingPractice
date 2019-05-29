package main

import (
	"fmt"
	"reflect"
)

type User struct {
	Id   int
	Name string
	Age  int
}

func (u User) ReflectCallFunc() {
	fmt.Println("Allen.Wu ReflectCallFunc")
}

// 通过接口来获取任意参数，然后一一揭晓
func DoFiledAndMethod(input interface{}) {

	getType := reflect.TypeOf(input)
	fmt.Println("get Type is :", getType.Name())

	getValue := reflect.ValueOf(input)
	fmt.Println("get all Fields is:", getValue)

	// 获取方法字段
	// 1. 先获取interface的reflect.Type，然后通过NumField进行遍历
	// 2. 再通过reflect.Type的Field获取其Field
	// 3. 最后通过Field的Interface()得到对应的value
	for i := 0; i < getType.NumField(); i++ {
		field := getType.Field(i)
		value := getValue.Field(i).Interface()
		fmt.Printf("%s: %v = %v\n", field.Name, field.Type, value)
	}

	// 获取方法
	// 1. 先获取interface的reflect.Type，然后通过.NumMethod进行遍历
	for i := 0; i < getType.NumMethod(); i++ {
		m := getType.Method(i)
		fmt.Printf("%s: %v\n", m.Name, m.Type)
	}
}

func main() {
	var num float64 = 1.2345

	//可直接通过reflect包取得一个实例的类型和值信息。 Pair(value, type)
	fmt.Println("type: ", reflect.TypeOf(num))   //type:  float64
	fmt.Println("value: ", reflect.ValueOf(num)) //value:  1.2345

	// 可以理解为“强制转换”，但是需要注意的时候，转换的时候，如果转换的类型不完全符合，则直接panic
	// Golang 对类型要求非常严格，类型一定要完全符合
	// 如下两个，一个是*float64，一个是float64，如果弄混，则会panic
	pointer := reflect.ValueOf(&num)
	value := reflect.ValueOf(num)
	fmt.Println("pointer:", pointer) //pointer: 0xc00009a000

	convertPointer := pointer.Interface().(*float64)
	convertValue := value.Interface().(float64)

	fmt.Println(convertPointer) //0xc00009a000
	fmt.Println(convertValue)   //1.2345

	//反射遍历一个类对象
	user := User{1, "Allen.Wu", 25}
	DoFiledAndMethod(user)

	//反射调用一个方法
	fmt.Print("call method func with reflect: ")
	getValue := reflect.ValueOf(user)
	methodValue := getValue.MethodByName("ReflectCallFunc")
	args := make([]reflect.Value, 0)
	methodValue.Call(args) //没有参数时，需要传递上面这个

}
