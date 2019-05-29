package main

import "fmt"

var container = []string{"zone", "one", "two"}

func main() {
	container := map[int]string{0:"zero", 1:"one", 2:"two"}
	fmt.Printf("The element is %q.\n", container[1])
	// fmt.Printf("%v\n", typeof(container))
	_, ok := interface{}(container).([]string)
	if ok {
		fmt.Printf("type is [] string")
	} else{
		fmt.Printf("type is not [] string")
	}
}