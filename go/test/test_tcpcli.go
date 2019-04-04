package main

import (
       "net" 
       "io/ioutil"
       "os"
       "fmt"
       "time"
)


func main(){
    if len(os.Args) !=2 {
        fmt.Fprintf(os.Stderr, "Usage: %s host:port\n", os.Args[0]) 
        os.Exit(-1)
    }

    service := os.Args[1]
    tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
    checkError(err, nil)

    for {
        conn, err := net.DialTCP("tcp", nil, tcpAddr)
        checkError(err, conn)

        go handleSend(conn)
        time.Sleep(1 * time.MSecond)
    }

    os.Exit(0)
}

func handleSend(conn net.Conn) {
     _, err := conn.Write([] byte("test"))
    checkError(err, conn)

    result, err := ioutil.ReadAll(conn)
    checkError(err, conn)

    fmt.Println(string(result))
}

func checkError(err error, conn net.Conn){
    if err != nil {
        if conn != nil {
            fmt.Fprintf(os.Stderr, "Fatal error: %s [%s]", err.Error(), conn.LocalAddr().String())
        } else{
            fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
        }

        os.Exit(1)
    }
}
