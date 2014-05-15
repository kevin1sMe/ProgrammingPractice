package main

import (
       "net" 
       "os"
       "fmt"
       "time"
)


func main(){
    if len(os.Args) !=2 {
        fmt.Fprintf(os.Stderr, "Usage: %s port\n", os.Args[0]) 
        os.Exit(-1)
    }

    service := os.Args[1]
    tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
    checkError(err)

    listener, err := net.ListenTCP("tcp", tcpAddr)
    checkError(err)

    for {
        conn, err := listener.Accept() 
        if err != nil {
            continue 
        }
        go handleClient(conn)
    }

}

func handleClient(conn net.Conn) {
    defer conn.Close()
    fmt.Println("new conn create:", conn.RemoteAddr().String()) 
    daytime := time.Now().String()
    conn.Write([]byte(daytime))
}

func checkError(err error){
    if err != nil {
        fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error()) 
        os.Exit(1)
    }

}
