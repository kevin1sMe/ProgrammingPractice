/*========================================================================
#   FileName: udp_checksum.cpp
#     Author: kevinlin
#      Email: linjiang1205@qq.com
#   History:  IP/UDP的校验和算法及其验证
# LastChange: 2016-05-27 16:42:38
========================================================================*/
#include <iostream>
#include <arpa/inet.h>
#include <stdio.h>

using namespace std;

//11:22:38.818265 IP 10.123.17.46.55883 > 224.0.0.252.hostmon: UDP, length 22
    //0x0000:  4500 0032 1e13 0000 0111 9f03 0a7b 112e  E..2.........{..
    //0x0010:  e000 00fc da4b 14eb 001e a637 94c2 0000  .....K.....7....
    //0x0020:  0001 0000 0000 0000 0477 7061 6400 0001  .........wpad...
    //0x0030:  0001

//11:33:23.940051 IP 10.123.17.14.19860 > 10.32.73.74.italk: UDP, length 115
    //0x0000:  4500 008f 0000 4000 4011 cb6b 0a7b 110e  E.....@.@..k.{..
    //0x0010:  0a20 494a 4d94 3039 007b 6f7f 0012 0000  ..IJM.09.{o.....
    //0x0020:  0000 1201 9000 0d00 0001 f3fa 0100 0001  ................
    //0x0030:  9500 0000 0001 9100 3900 0001 9100 3900  ........9.....9.
    //0x0040:  0001 9100 3900 0001 9100 3a00 0001 f3fa  ....9.....:.....
    //0x0050:  0200 0001 9100 3a00 0001 9100 3b00 0001  ......:.....;...
    //0x0060:  9100 3b00 0001 9100 3b00 0001 9100 3c00  ..;.....;.....<.
    //0x0070:  0001 9100 3c00 0001 9100 3c00 0001 9100  ....<.....<.....
    //0x0080:  3d00 0001 9100 3d00 0001 9100 3d00 00    =.....=.....=..
#pragma pack(1)

typedef struct {
    union {
        struct {
            unsigned char ihl:4;  //版本
            unsigned char version:4; //首部长度
        };
        uint8_t v;
    };

    uint8_t  tos; //服务类型
    uint16_t total_len; //总长度 
    uint16_t id; //标志
    uint16_t frag_off; //分片偏移
    uint8_t  ttl; //生存时间
    uint8_t  protocol; //协议
    uint16_t check_sum; //校验和
    struct in_addr src_addr; //源ip
    struct in_addr dst_addr; //目标ip
} IPHeader;

typedef struct {
    //udp伪首部
    uint32_t src_ip;
    uint32_t dst_ip;
    uint16_t udp_len; //udp包大小
    uint8_t rsv; // 0x00
    uint8_t protocol; //协议类型， 0x11

    //udp首部
    uint16_t src_port;
    uint16_t dst_port;
    uint16_t len; //包括包头的udp包大小
    uint16_t check_sum; //校验和
} UDPChecksum;

typedef struct {
    uint16_t src_port;
    uint16_t dst_port;
    uint16_t len; //包括包头的udp包大小
    uint16_t check_sum; //校验和
} UDPHeader;

typedef struct {
    IPHeader ip_header;
    UDPHeader udp_header;
    char body[0];
} UDPPkg;

#pragma pack()


uint16_t check_sum(uint16_t* buf, int len)
{
    uint32_t sum = 0;

    while(len > 1)
    {
        sum += *buf++;
        len -= sizeof(uint16_t);
    };

    if(len)
    {
        sum += *(uint8_t*)buf;
    }

    while(sum >> 16)
    {
        sum = (sum >> 16) + (sum & 0xFFFF);
    }

    return (uint16_t)~sum;
}

int main()
{
    char pkg[1024] =  { 0x45, 0x00, 0x00, 0x32, 0x1e, 0x13, 0x00, 0x00, 0x01, 0x11, 0x9f, 0x03, 0x0a, 0x7b, 0x11, 0x2e, 
        0xe0, 0x00, 0x00, 0xfc, 0xda, 0x4b, 0x14, 0xeb, 0x00, 0x1e, 0xa6, 0x37, 0x94, 0xc2, 0x00, 0x00, 
        0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x77, 0x70, 0x61, 0x64, 0x00, 0x00, 0x01, 
        0x00, 0x01
     };

    UDPPkg* p1 = (UDPPkg*)&pkg;
    UDPHeader& header = p1->udp_header;
    uint16_t src_port = ntohs(header.src_port);
    uint16_t dst_port = ntohs(header.dst_port);
    uint16_t udp_len = ntohs(header.len);
    uint16_t udp_check_sum = ntohs(header.check_sum);

    cout<<"[UDPHeader]"<<endl
        <<"src_port:"<<src_port<<endl
        <<"dst_port:"<<dst_port<<endl
        <<"udp_len:"<<udp_len<<endl
        <<"check_sum:"<<udp_check_sum<<endl
        <<endl;
        
    //[UDPHeader]
        //src_port:55883
        //dst_port:5355
        //udp_len:30
        //check_sum:42551

    IPHeader& ip_header = p1->ip_header;
    uint16_t total_len = ntohs(ip_header.total_len);
    uint16_t ip_check_sum  = ntohs(ip_header.check_sum);
      
    //0x9f 0x03 = ip_check_sum
    cout<<"[IPHeader]"<<endl
        <<"total_len:" << total_len<<endl
        <<"ip_check_sum:" << ip_check_sum<<endl
        <<"src_ip:" << inet_ntoa(ip_header.src_addr) <<endl;

    cout<<"dst_ip:" << inet_ntoa(ip_header.dst_addr) <<endl
        <<endl;

    //IP包的校验和只检查ip头部。
    uint16_t calc_ip_checksum = check_sum((uint16_t*)&p1->ip_header, 20);
    cout<<"Check IP checksum:" << calc_ip_checksum <<", htons():" << htons(calc_ip_checksum) <<endl;

    char udp_pkg[1024] = {0};
    UDPChecksum* udp = (UDPChecksum*)udp_pkg;
    //udp->src_ip = htonl(ip_header.src_addr.s_addr);
    //udp->dst_ip = htonl(ip_header.dst_addr.s_addr);
    udp->src_ip = ip_header.src_addr.s_addr;
    udp->dst_ip = ip_header.dst_addr.s_addr;
    udp->udp_len = htons(udp_len);
    udp->rsv = 0;
    udp->protocol = 0x11;

    udp->src_port = htons(src_port);
    udp->dst_port = htons(dst_port);
    udp->len = htons(udp_len);
    udp->check_sum = htons(udp_check_sum);

    char* udp_body = udp_pkg + sizeof(UDPChecksum);
    int body_len = udp_len - sizeof(UDPHeader);
    cout<<"udp_body_len:" << body_len <<endl;
    char* udp_body_src =  pkg + offsetof(UDPPkg, body);
    for(int i=0; i < body_len; ++i)
    {
        udp_body[i] = udp_body_src[i];
    }

    for(int i=0; i < body_len + sizeof(UDPChecksum); ++i)
    {
        printf("udp[%d]: 0x%02X\n", i, (char)udp_pkg[i]);
    };

    uint16_t calc_udp_checksum = check_sum( (uint16_t*)udp_pkg, sizeof(UDPChecksum) + body_len);
    cout<<"udp checksum len:" << sizeof(UDPChecksum) + body_len << endl;
    cout<<"calc_udp_checksum:" << calc_udp_checksum<<endl;

    return 0;
}
