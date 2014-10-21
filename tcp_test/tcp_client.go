package main

import (
       "net"
       "io/ioutil"
       "os"
       "fmt"
       "time"
       "math/rand"
       "sync"
       "sync/atomic"
)

type Status struct {
    wg sync.WaitGroup
    actives int32
}

func main(){
    if len(os.Args) !=2 {
        fmt.Fprintf(os.Stderr, "Usage: %s host:port\n", os.Args[0]) 
        os.Exit(-1)
    }

    service := os.Args[1]
    tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
    checkError(err, nil)

    rand.Seed(time.Now().UnixNano())
    last_dump_time := time.Now().Second()
    var s Status

    for {
        conn, err := net.DialTCP("tcp", nil, tcpAddr)
        checkError(err, conn)

        go handleSend(&s, conn)
        time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)

        now := time.Now()
        if(last_dump_time + 5 < now.Second()) {
            fmt.Fprintf(os.Stdout, "%s total actives is %d\n", now.String(), s.actives)
            last_dump_time = now.Second()
        }

    }

    os.Exit(0)
}

func handleSend(s *Status, conn net.Conn) {
    //for count total actives
    atomic.AddInt32(&s.actives, 1)
    defer func() {
        atomic.AddInt32(&s.actives, -1)
    }()

    /*r := rand.New(rand.NewSource(time.Now().UnixNano()))*/
    time.Sleep(time.Duration(rand.Intn(10)) * time.Second)
    _, err := conn.Write([] byte("gettime"))
    checkError(err, conn)

    result, err := ioutil.ReadAll(conn)
    checkError(err, conn)

    fmt.Fprintf(os.Stdout, "recv: %s\n", string(result))
    conn.Close()
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
