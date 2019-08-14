package main

import (
	"os"
	"os/signal"
	"syscall"
	"time"

	log "github.com/sirupsen/logrus"
)

func main() {

	// 监听TERM信号
	ch := make(chan os.Signal, 4)
	signal.Notify(ch, syscall.SIGTERM)
	signal.Notify(ch, syscall.SIGINT)
	signal.Notify(ch, syscall.SIGUSR1)
	signal.Notify(ch, syscall.SIGUSR2)

	done := make(chan bool, 1)

	ticker := time.Tick(time.Second)
	//graceful exit
	go func() {
		for {
			select {
			case sig := <-ch:
				log.Warnf("Got %s signal", sig)
				switch sig {
				case syscall.SIGUSR1:
					log.Infof("Recv %s signal", sig)
				case syscall.SIGUSR2: //stop prof
					log.Infof("Recv %s signal", sig)
				default:
					log.Printf("Got %s signal. Server will exit.", sig)
					done <- true
				}

			case <-ticker:
				log.Print("a tick...\n")
			}
		}
	}()

	<-done
}
