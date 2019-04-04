package main

import (
       "net"
       /*"io/ioutil"*/
       "os"
       "fmt"
       "time"
       "math/rand"
       "sync"
       "sync/atomic"
       "strconv"
)

type Status struct {
    wg sync.WaitGroup
    actives int32
}

func main(){
    if len(os.Args) !=3 {
        fmt.Fprintf(os.Stderr, "Usage: %s host:port conn_count\n", os.Args[0]) 
        os.Exit(-1)
    }

    service := os.Args[1]
    tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
    checkError(err, nil)

    i, _ := strconv.Atoi(os.Args[2])
    max_conn_count := int32(i)

    rand.Seed(time.Now().UnixNano())
    last_dump_time := time.Now().Second()
    var s Status

    conn_begin_time := time.Now().UnixNano()

    for {
        if(s.actives >= max_conn_count) {
            conn_end_time := time.Now().UnixNano()
            fmt.Fprintf(os.Stdout, "=== create %d connections used %f ms ===\n", s.actives, float32(conn_end_time - conn_begin_time)/1000000)
            break
        }

        conn, err := net.DialTCP("tcp", nil, tcpAddr)
        checkError(err, conn)

        go handleSend(&s, conn)
        /*time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)*/
        now := time.Now()
        if(last_dump_time + 5 <= now.Second()) {
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

    for {
        time.Sleep(100 * time.Second)
    }
    /*r := rand.New(rand.NewSource(time.Now().UnixNano()))*/
    /*time.Sleep(time.Duration(rand.Intn(10)) * time.Second)*/
    /*_, err := conn.Write([] byte("gettime"))*/
    /*checkError(err, conn)*/

    /*result, err := ioutil.ReadAll(conn)*/
    /*checkError(err, conn)*/

    /*fmt.Fprintf(os.Stdout, "recv: %s\n", string(result))*/
    /*conn.Close()*/
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
