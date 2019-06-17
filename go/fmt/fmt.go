package main

import (
	"fmt"
	"log"
)

func makeError() error {
	return fmt.Errorf("error cause")
}

//测试fmt时的一些格式化控制效果

func main() {
	// 错误输出, 结论使用%v,%s都可以
	if err := makeError(); err != nil {
		log.Printf("get errors:[%%+v] %+v", err)
		log.Printf("get errors:[%%v] %v", err)
		log.Printf("get errors:[%%s] %s", err)
		log.Printf("get errors:[no flag]", err)
	}

    // 结构体输出, 结论，推荐%+v（可输出结构体名), 或许效率上有影响？
    type Person struct  {
        name string
        age int
    }
    me := Person{"kevin", 33}
    log.Printf("struct print:[%%+v] %+v", me)
    log.Printf("struct print:[%%#v] %#v", me)
    log.Printf("struct print:[%%v] %v", me)
    log.Printf("struct print:[%%s] %s", me)
    log.Printf("struct print:[%%T] %T", me)

    //字符串, 使用%q会将字符串带上双引号, 使用%v也可以。推荐%v或%q
    s := "Hello, world"
    log.Printf("string print:[%%s]:%s", s)
    log.Printf("string print:[%%q]:%q", s)
    log.Printf("string print:[%%v]:%v", s)

    //十六进制， 使用% x这样可以将字符串输出01 02 03类似的格式
    log.Printf("string print:[%%x]:% x", s)

    //切片, 像打印单个元素一样，使用%d, %x, %b, 但推荐使用+v
    ar := []int{1,2,3,4,5}
    log.Printf("slice print:[%%d] %d", ar)
    log.Printf("slice print:[%%x] %x", ar)
    log.Printf("slice print:[%%v] %v", ar)
    log.Printf("slice print:%p", ar)
}
