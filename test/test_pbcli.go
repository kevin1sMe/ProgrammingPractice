package main

import (
       "./testpb"
       proto "code.google.com/p/goprotobuf/proto"
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
        time.Sleep(1000 * time.Second)
    }

    os.Exit(0)
}

func handleSend(conn net.Conn) {
    defer conn.Close()
    //encode by protobuf
    req := &testpb.TestReq {
        Str: proto.String("kevin's test'"),
        IntList: []int32 {9, 7},
     }

    buff , err := proto.Marshal(req)
    if err == nil {
        fmt.Println("TestReq:", req)
        fmt.Println("TestReq buff:", buff)
    } else {
        fmt.Println("Marshal TestReq failed", err)
        return
    }

     _, err = conn.Write(buff)
    checkError(err, conn)

    result, err := ioutil.ReadAll(conn)
    checkError(err, conn)

    fmt.Println("receive from svr:", string(result))

    //decode 
    rsp := new(testpb.TestRsp)
    err = proto.Unmarshal(result, rsp)
    if err != nil {
        fmt.Println("Unmarshal TestRsp", err)
    }else{
        fmt.Println("Unmarshal result:", rsp)
    }
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
