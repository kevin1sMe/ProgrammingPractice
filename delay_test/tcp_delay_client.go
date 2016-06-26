//========================================================================
//   FileName: tcp_delay.go
//     Author: kevinlin
//      Email: linjiang1205#qq.com
//   History: 测试tcp的收包延迟客户端
// LastChange: 2016-03-17 09:01:25
//========================================================================
package main

import (
	"fmt"
	//"io/ioutil"
	"bytes"
	"encoding/binary"
	"math/rand"
	"net"
	"os"
	"strconv"
	"sync"
	"sync/atomic"
	"time"
)

type Status struct {
	wg      sync.WaitGroup
	actives int32
}

func main() {
	if len(os.Args) != 4 {
		fmt.Fprintf(os.Stderr, "Usage: %s host:port conn_count send_interval\n", os.Args[0])
		os.Exit(-1)
	}

	service := os.Args[1]
	tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
	checkError(err, nil)

	i, _ := strconv.Atoi(os.Args[2])
	max_conn_count := int32(i)

	i, _ = strconv.Atoi(os.Args[3])
	interval := int32(i)

	rand.Seed(time.Now().UnixNano())
	last_dump_time := time.Now().Second()
	var s Status

	conn_begin_time := time.Now().UnixNano()

	for {
		if s.actives >= max_conn_count {
			conn_end_time := time.Now().UnixNano()
			fmt.Fprintf(os.Stdout, "=== create %d/%d connections used %f ms ===\n",
				s.actives, max_conn_count, float32(conn_end_time-conn_begin_time)/1000000)
			break
		}

		conn, err := net.DialTCP("tcp", nil, tcpAddr)
		checkError(err, conn)
		fmt.Fprintf(os.Stdout, "create tcp link\n")

		go handleSend(&s, conn, interval)
		/*time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)*/
		now := time.Now()
		if last_dump_time+5 <= now.Second() {
			fmt.Fprintf(os.Stdout, "%s total actives is %d\n", now.String(), s.actives)
			last_dump_time = now.Second()
		}
	}

	for {
		if s.actives == 0 {
			fmt.Fprintf(os.Stdout, "all active dead")
			break
		}
		time.Sleep(time.Second)
	}

	os.Exit(0)
}

type NtpBody struct {
	Length int32
	T1     int64
}

func handleSend(s *Status, conn net.Conn, interval int32) {
	//for count total actives
	atomic.AddInt32(&s.actives, 1)
	defer func() {
		atomic.AddInt32(&s.actives, -1)
	}()

	send_count := 0
	//send pkg every interval ms,
	for {
		send_time := time.Now().UnixNano()
		//将时间戳写到包体中
		var body NtpBody
		body.T1 = send_time
		body.Length = int32(binary.Size(body))
		data := make([]byte, body.Length)
		binary.Write(bytes.NewBuffer(data), binary.BigEndian, &body)
		_, err := conn.Write(data)
		checkError(err, conn)

		fmt.Fprintf(os.Stdout, "send data, wait rsp...")
		//读取返回包
		_, err = conn.Read(data)
		checkError(err, conn)
		binary.Read(bytes.NewBuffer(data), binary.BigEndian, &body)
		fmt.Fprintf(os.Stdout, "NtpBody.Length:%d T1:%d\n", body.Length, body.T1)

		recv_time := time.Now().UnixNano()
		fmt.Fprintf(os.Stdout, "send:%d recv:%d diff:%d ms\n", send_time, recv_time, (recv_time-send_time)/1000000)
		time.Sleep(time.Duration(interval) * time.Millisecond)
		send_count += 1
		if send_count > 100 {
			break
		}
	}

	conn.Close()
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
