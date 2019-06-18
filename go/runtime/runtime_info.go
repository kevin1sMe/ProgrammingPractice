package main

import (
    "fmt"
    "runtime"
)


func main() {
    fmt.Println("cpus:", runtime.NumCPU())
    fmt.Println("num goroutine:", runtime.NumGoroutine())
    fmt.Println("goroot:", runtime.GOROOT())
    fmt.Println("archive:", runtime.GOOS)
    fmt.Println("go version:", runtime.Version())
}
