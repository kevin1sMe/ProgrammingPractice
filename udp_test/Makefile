ALL= udp_client udp_serv 
all: ${ALL}

udp_client: udp_client.cpp
	gcc udp_client.cpp -o udp_client

udp_serv: udp_server.cpp
	gcc udp_server.cpp -o udp_serv


clean:
	rm ${ALL}


