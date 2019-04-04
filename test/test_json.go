package main

import "encoding/json"
import "fmt"
import "os"

type Test struct {
	Ret int    `json:"ret"`
	Msg string `json:"msg"`
}

func main() {
	test := Test{Ret: 0, Msg: "just test"}
	fmt.Println(test)
	fmt.Println(test.Ret)
	fmt.Println(test.Msg)
	b, err := json.Marshal(test)
	if err != nil {
		fmt.Println("json Marshal err")
		os.Exit(1)
	}
	fmt.Printf("%s", b)
}
