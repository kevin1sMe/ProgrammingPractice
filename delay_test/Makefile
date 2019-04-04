.PHONY:all

all: udp_s udp_c tcp_delay_server tcp_delay_client rudp_s rudp_c test_udp test_tcp test_rudp

udp_s: udp_delay_server.cpp
	g++ $^ -o $@

udp_c: udp_delay_client.cpp
	g++ $^ -o $@

tcp_delay_server: tcp_delay_server.go
	go build $^

#tcp_delay_client: tcp_delay_client.go
#	go build $^
tcp_delay_client: tcp_delay_client.cpp
	g++ $^ -o $@

rudp_c: rudp_client.cpp
	g++ $^ -pthread -o $@
rudp_s: rudp_server.cpp
	g++ $^ -pthread -o $@



test_udp: udp_s udp_c
	@echo  "==== udp delay test ========"
	@echo "start udp server..."
	./udp_s&
	@echo "start end"

	@echo "start udp client..."
	./udp_c 127.0.0.1 1986 10 100 
	killall -9 udp_s
	@echo  "==== udp delay test end ========"
	@echo

test_rudp: rudp_s rudp_c
	@echo  "==== rudp delay test ========"
	@echo "start rudp server..."
	./rudp_s 1986 &
	@echo "start end"

	@echo "start rudp client..."
	./rudp_c 127.0.0.1 1986 10 100 
	killall -9 rudp_s
	@echo  "==== rudp delay test end ========"
	@echo


test_tcp: tcp_delay_server tcp_delay_client
	@echo  "==== tcp delay test ========"
	@echo "start tcp server..."
	./tcp_delay_server 127.0.0.1:1986 &
	@echo "start end"

	@echo "start tcp client..."
	./tcp_delay_client 127.0.0.1 1986 10 100
	killall -9 tcp_delay_server
	@echo  "==== tcp delay test end ========"

