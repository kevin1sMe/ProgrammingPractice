#!/usr/bin/env python

import socket
import time

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('localhost', 4242))
print("connect to server~")
time.sleep(5)
for i in range(1,100):
    print i, "Send Hello to server~"
    s.send('Hello, world\r\n')
    data = s.recv(1024)
    print "Recviced", data
    time.sleep(5)
    

s.close()
