package main

import (
       "./testpb"
       proto "code.google.com/p/goprotobuf/proto"
       "net" 
       "os"
       "fmt"
       /*"time"*/
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

    b := make([]byte, 128)
    n, err := conn.Read(b)
    if err != nil {
        fmt.Fprintf(os.Stderr, "Conn.Read failed: %v", err)
        return
    }

    fmt.Println("receive ", n , "from client:", b[:n])
    //decode 
    req := new(testpb.TestReq)
    err = proto.Unmarshal(b[:n], req)
    if err != nil {
        fmt.Println("Unmarshal TestReq", err)
    }else{
        fmt.Println("Unmarshal result:", req)
    }

    //calc sum of int list
    var sum int32 = 0
    for i:=0; i < len(req.IntList) ; i++ {
        sum += req.IntList[i]
    }

    //send rsp
    rsp := new(testpb.TestRsp)
    rsp.Sum = proto.Int32(sum)
    rsp_buf, err := proto.Marshal(rsp)
    if err != nil {
        fmt.Println("Marshal TestRsp failed", rsp)
        return
    }
    
    conn.Write(rsp_buf)
}

func checkError(err error){
    if err != nil {
        fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error()) 
        os.Exit(1)
    }

}
