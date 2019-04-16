package main

import (
       "./testpb"
       proto "github.com/golang/protobuf/proto"
       "fmt"
       "testing"
       "math/rand"
       "time"
       "compress/lzw"
       "bytes"
       "bufio"
       "io"
)

//测试使用lzw压缩，对于pb编码后的数据，有多少收益（压缩率能达到多少)
//Usage: go test


//Params: 
//      dataSize: 构造的记录条数(决定数据长度)
//Returns:
//     ratio 压缩率 
func LzwTest(dataSize int) (before int, after int, ratio float32, err error){
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    var pbNinjiaList []*testpb.Ninjia
    for i := 0 ; i < dataSize; i++ {
		pbNinjiaList = append(pbNinjiaList, &testpb.Ninjia{Id: r.Uint32(), Hp: uint32(r.Intn(100+1))})
	}
    //encode by protobuf
    history := &testpb.NinJiaHistory{ NinjiaList: pbNinjiaList}

    var before_compress_sz, after_compres_sz int
    buff , err := proto.Marshal(history)
    if err == nil {
        before_compress_sz = len(buff)
        //fmt.Printf("pb Marshal succ,  len:%d \nbuff:%v\n", len(buff), buff)
    } else {
        return 0, 0, 0, err
    }

    //使用压缩
    var b bytes.Buffer
    w := lzw.NewWriter(&b, lzw.LSB, 8)
    w.Write(buff)
    w.Close()
    //fmt.Printf("after compress. len:%d\n buff:%v\n", b.Len(), b.Bytes())
    after_compres_sz = b.Len()

    //读取压缩的内容
    var out bytes.Buffer
    reader := lzw.NewReader(&b, lzw.LSB, 8)
    io.Copy(bufio.NewWriter(&out), reader)
    reader.Close()
    //fmt.Printf("after uncompress. len:%d\n buff:%v\n", out.Len(), out.Bytes())
    //fmt.Println("=================")
    ratio =  float32(after_compres_sz)/float32(before_compress_sz)
    return before_compress_sz, after_compres_sz, ratio, nil
}

//lzw
//当sz=250Byte时，lzw压缩有些收益
func Test_CompressRatio_Lzw(t *testing.T) {
    for i:=1; i < 300; i +=5 {
        if b, a, ratio, err := LzwTest(i) ; err == nil {
            fmt.Printf("pb lzw compress| sz:%d before:%d after:%d ratio:%.2f\n", i, b, a, ratio)
        }
    } 
}

