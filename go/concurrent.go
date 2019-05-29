package main

//并发执行的同步方法
//1.使用mutex, lock,unlock
//2.使用channel,(非缓冲)
//3.使用sync.Once

import (
	"flag"
	"fmt"
	"sync"
)

// var c = make(chan int, 1)
// var c = make(chan int)
var a string
var once sync.Once

func f() {
	a = "hello , world"
	// <- c
}

func doPrint() {
	once.Do(f)
	// go f()
	// c <- 0
	// close(c)
	print(a)

}

func main() {
	var name = getTheFlag()
	flag.Parse()
	fmt.Printf("Hello, %v\n",*name)

	doPrint()
	doPrint()
}

func getTheFlag() * string {
	return flag.String("name", "everyone", "The greeting object")
}