//========================================================================
//   FileName: tcp_delay.go
//     Author: kevinlin
//      Email: linjiang1205#qq.com
//   History: 测试tcp的收包延迟客户端
// LastChange: 2016-03-17 09:01:25
//========================================================================
package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"net"
	"os"
	"strconv"
	"time"
)

func main() {
	if len(os.Args) != 4 {
		fmt.Fprintf(os.Stderr, "Usage: %s host:port send_count send_interval(ms)\n", os.Args[0])
		os.Exit(-1)
	}

	service := os.Args[1]
	tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
	checkError(err, nil)

	i, _ := strconv.Atoi(os.Args[2])
	send_count := int32(i)

	i, _ = strconv.Atoi(os.Args[3])
	send_interval := int32(i)

	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	checkError(err, conn)
	fmt.Fprintf(os.Stdout, "create tcp link\n")

	for j := 0; j < int(send_count); j++ {
		fmt.Fprintf(os.Stdout, "==== %d ====\n", j)
		//go handleSend(&s, conn)
		handleSend(conn)
		time.Sleep(time.Duration(send_interval) * time.Millisecond)
	}

	conn.Close()
	os.Exit(0)
}

type NtpBody struct {
	Length int32
	T1     int64
}

func handleSend(conn net.Conn) {
	send_time := time.Now().UnixNano()
	//将时间戳写到包体中
	var body NtpBody
	body.T1 = send_time
	body.Length = int32(binary.Size(body))
	var buffBytes bytes.Buffer
	binary.Write(&buffBytes, binary.BigEndian, &body)
	_, err := conn.Write(buffBytes.Bytes())
	checkError(err, conn)

	//fmt.Fprintf(os.Stdout, "send body.Length:%d buff:%v, wait rsp...\n", body.Length, buffBytes.Bytes())

	//读取返回包
	_, err = conn.Read(buffBytes.Bytes())
	checkError(err, conn)
	binary.Read(&buffBytes, binary.BigEndian, &body)
	//fmt.Fprintf(os.Stdout, "NtpBody.Length:%d T1:%d\n", body.Length, body.T1)

	send_time = body.T1
	recv_time := time.Now().UnixNano()
	fmt.Fprintf(os.Stdout, "send:%d recv:%d diff:%d us\n", send_time, recv_time, (recv_time-send_time)/1000)
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
