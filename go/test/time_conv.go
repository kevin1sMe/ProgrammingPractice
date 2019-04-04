package main

import "time"
import "fmt"

func main() {
	fmt.Println(time.Now())
	fmt.Println(time.Now().String())
	fmt.Println(time.Now().Format("20060102_03_04_05"))
}
