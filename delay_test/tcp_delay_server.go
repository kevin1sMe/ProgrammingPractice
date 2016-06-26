//========================================================================
//   FileName: tcp_delay_server.go
//     Author: kevinlin
//      Email: linjiang1205#qq.com
//   History: 测试tcp的收包延迟, 服务 器
// LastChange: 2016-06-26 17:35:51
//========================================================================
package main

import (
	"fmt"
	//"io/ioutil"
	//"math/rand"
	"net"
	"os"
	//"strconv"
	//"sync"
	//"sync/atomic"
	"bufio"
	"bytes"
	//"time"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s host:port\n", os.Args[0])
		os.Exit(-1)
	}

	service := os.Args[1]
	tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
	checkError(err, nil)

	tcpListener, _ := net.ListenTCP("tcp", tcpAddr)
	defer tcpListener.Close()

	for {
		tcpConn, err := tcpListener.AcceptTCP()
		if err != nil {
			continue
		}
		fmt.Println("A client connected : " + tcpConn.RemoteAddr().String())
		go tcpPipe(tcpConn)
	}
	os.Exit(0)
}

func tcpPipe(conn *net.TCPConn) {
	ipStr := conn.RemoteAddr().String()
	defer func() {
		fmt.Println("disconnected :" + ipStr)
		conn.Close()
	}()

	reader := bufio.NewReader(conn)
	for {
		//message, err := reader.ReadString('\n')
		//if err != nil {
		//return
		//}

		//fmt.Println(string(message))
		//msg := time.Now().String() + "\n"
		//b := []byte(msg)
		var b bytes.Buffer
		reader.WriteTo(&b)
		fmt.Fprintf(os.Stderr, "recv data:%v", b)
		conn.Write(b.Bytes())
	}
}

func checkError(err error, conn net.Conn) {
	if err != nil {
		if conn != nil {
			fmt.Fprintf(os.Stderr, "Fatal error: %s [%s]", err.Error(), conn.LocalAddr().String())
		} else {
			fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		}

		os.Exit(1)
	}
}
