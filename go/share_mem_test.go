package concurrent

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

//线程安全相关

//非线程安全版本，这里预期是5000次，实际上最后<5000
func TestCounterUnsafe(t *testing.T) {
	counter := 0
	for i := 0; i < 5000; i++ {
		go func() {
			counter++
		}()
	}

	time.Sleep(1 * time.Second)
	//t.Logf("counter = %d", counter)
	fmt.Printf("counter = %d\n", counter)
}

//使用mutex保证线程安全
func TestCounterUsingMutex(t *testing.T) {
	var mut sync.Mutex
	counter := 0
	for i := 0; i < 5000; i++ {
		go func() {
			defer func() {
				mut.Unlock()
			}()

			mut.Lock()
			counter++
		}()
	}

	time.Sleep(1 * time.Second)
	//t.Logf("counter = %d", counter)
	fmt.Printf("counter = %d\n", counter)
}

//使用wait group保证线程运行结束后退出
func TestCounterUsingWaitGroup(t *testing.T) {
	var wg sync.WaitGroup
	var mut sync.Mutex //如果有读写操作，建议使用RWMutex
	counter := 0
	for i := 0; i < 5000; i++ {
		wg.Add(1)
		go func() {
			defer func() {
				mut.Unlock()
			}()

			mut.Lock()
			counter++
			wg.Done()
		}()
	}

	//time.Sleep(1 * time.Second)
	//可以不必使用上面的sleep了，而更加准确的wait所有协程执行完
	wg.Wait()
	//t.Logf("counter = %d", counter)
	fmt.Printf("counter = %d\n", counter)
}
