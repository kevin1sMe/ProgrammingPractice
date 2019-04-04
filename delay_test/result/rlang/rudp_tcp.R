#根据测试程序，分别使用tcp/rudp在各种网络环境下，测试的数据进行分析
#2016-8-8

show_barplot <- function(tcp_data, udp_data, title){
  #tcp
  group1 <- data.matrix(tcp_data)
  g <- tabulate(group1)[0:500]
  fac <- factor(rep(1:10, each=50))
  g_times <- tapply(g, fac, sum, na.rm=TRUE)
  tcp <- round(g_times/sum(g_times, na.rm=TRUE)*100, 2)
  
  #udp
  group2 <- data.matrix(udp_data)
  g <- tabulate(group2)[0:500]
  fac <- factor(rep(1:10, each=50))
  g_times <- tapply(g, fac, sum, na.rm=TRUE)
  udp <- round(g_times/sum(g_times, na.rm=TRUE)*100, 2)
  
  rtt <- paste("~", c(rep(1:10)*50), "ms" )
  dt_ori <- data.frame(tcp, udp, row.names=rtt)
  dt <- t(dt_ori)
  barplot(dt, names.arg = rtt, xlab = "RTT", ylab="Percent",  col=c("orange", "green"),
          main=title, legend=rownames(dt), beside = TRUE , args.legend=list(bty="n"))
  
}

par(mfrow=c(2,2))

#在良好的wifi网络下的数据对比
tcp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/tcp.66ms.100times.wifi.data",header=FALSE)
udp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/rudp.66ms.100times.wifi.data",header=FALSE)
show_barplot(tcp_rtt, udp_rtt, "TCP/RUDP RTT Test(wifi)")


#在高丢包率50%环境下数据对比
tcp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/tcp.66ms.100times.50drop.data",header=FALSE)
udp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/rudp.66ms.100times.50drop.data",header=FALSE)
show_barplot(tcp_rtt, udp_rtt, "TCP/RUDP RTT Test(high dropped 50%)")


#丢包率5%情况下数据
tcp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/tcp.66ms.100times.drop5.data",header=FALSE)
udp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/rudp.66ms.100times.drop5.data",header=FALSE)
show_barplot(tcp_rtt, udp_rtt, "TCP/RUDP RTT Test(low dropped 5%)")


#50ms抖动时
tcp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/tcp.66ms.100times.lanc50.data",header=FALSE)
udp_rtt <- read.table("/Users/kevinlin/WorkSpace/repo/network_test/delay_test/result/rlang/rudp.66ms.100times.lanc50.data",header=FALSE)
show_barplot(tcp_rtt, udp_rtt, "TCP/RUDP RTT Test(50ms jitter)")

