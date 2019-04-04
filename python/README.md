##python socket and nc server

In mac osx10.10
---
###Server

` while true; do nc -l 4242 < nc.rsp ; done`

or 

`nc -kl 4242 < nc.rsp`

###Client

`./client.py`


###FIXME

1)why nc server response like this 
```
[~/Source/git_repo/network_test/python]$ ./client.py                                                                                               *[master] 
1 Send Hello to server~
Recviced this is nc response

2 Send Hello to server~
Recviced 
3 Send Hello to server~
Recviced 
4 Send Hello to server~
Recviced 
```

rather than
```
[~/Source/git_repo/network_test/python]$ ./client.py                                                                                               *[master] 
1 Send Hello to server~
Recviced this is nc response

2 Send Hello to server~
Recviced this is nc response
3 Send Hello to server~
Recviced this is nc response
4 Send Hello to server~
Recviced this is nc response
```

