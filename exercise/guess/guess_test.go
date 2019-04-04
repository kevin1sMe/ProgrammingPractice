package main

import "testing"

//注意测试函数必须以Test开头
//函数中可以调用testing.T的Error, Errorf, FailNow, Fatal, FatalIf等方法说明测试不通过
// 调用Log方法用来记录测试信息
//go test -v
func Test_RndNumLen(t *testing.T) {
	ret := RndNum()
	if len(ret) != 4 {
		t.Error("len err")
	} else {
		t.Log("check return len succ")
	}
}

func Test_RndNumHead(t *testing.T) {
	ret := RndNum()
	if ret[0] == 0 {
		t.Error("head check err")
	} else {
		t.Log("head check succ")
	}
}

func Test_RndNumContent(t *testing.T) {
	ret := RndNum()
	for i, v := range ret {
		for j := 0; j < i; j++ {
			if v == ret[j] {
				t.Error("content check err")
				break
			}
		}
	}
	t.Log("content check succ")
}

//go test -test.bench=".*" 压测全部函数
//go test -test.bench="test_name_regex"
//注意压力测试函数必须以Benchmark开头
func Benchmark_RndNumBenchmark(b *testing.B) {
	b.StopTimer() //调用该函数停止压力测试的时间计数

	b.StartTimer() //重新开始时间计数
	for i := 0; i < b.N; i++ {
		RndNum()
	}
}
