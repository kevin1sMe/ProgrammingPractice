###一个简单的不能再简单的tcp server。

client端使用golang写的，见tcp_client.go

####验证点
1. select()受最大fd的影响。。。
　结论：　当accept()　fd > MAX_FD时，　崩溃。。

2. select()的性能, 后续和poll, epoll比较  

 * 建立xx个连接速度比较
 ```sh
/home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 100 connections used 17.429611 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 100 connections used 16.137430 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 100 connections used 13.211085 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 100 connections used 10.886358 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 100 connections used 11.474354 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 106 connections used 18.958580 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 100 connections used 11.221907 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 100                                                 git:master*
 === create 100 connections used 10.717689 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 500                                                 git:master*
 === create 500 connections used 2059.071289 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 500                                                 git:master*
 === create 500 connections used 2043.632202 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 500                                                 git:master*
 === create 500 connections used 2057.876709 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 500                                                 git:master*
 === create 500 connections used 2047.150269 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 200                                                 git:master*
 === create 200 connections used 23.415655 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 200                                                 git:master*
 === create 200 connections used 24.624302 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 200                                                 git:master*
 === create 200 connections used 1025.073608 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 200                                                 git:master*
 === create 200 connections used 12.565681 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 200                                                 git:master*
 === create 200 connections used 16.329145 ms ===
 /home/kevin/repo/network_test/tcp_test ➤ ./tcp_client 127.0.0.1:1986 200                                                 git:master*
 === create 200 connections used 24.894501 ms ===
 ```


 * 连接建立后，进行数据传输稳定时的cpu,memory占用情况比较
