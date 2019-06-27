/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

//go:generate protoc -I ../helloworld --go_out=plugins=grpc:../helloworld ../helloworld/helloworld.proto

// Package main implements a server for Greeter service.
package main

import (
	"context"
	"log"
	"net"
	"os/signal"
	"syscall"

	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
	"google.golang.org/grpc/metadata"
)

const (
	port = ":50051"
)

// server is used to implement helloworld.GreeterServer.
type server struct{}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.Name)
	return &pb.HelloReply{Message: "Hello " + in.Name}, nil
}

// 测试拦截器的函数
func interceptorTestFunc(ctx context.Context) error {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		log.Println("ctx not found ")
		return grpc.Errorf(codes.Unauthenticated, "not find ctx")
	}
	log.Printf("ctx is %+v", md)

	return nil
}

func main() {
	// 监听TERM信号
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, syscall.SIGTERM)
	signal.Notify(ch, syscall.SIGINT)

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	var opts []grpc.ServerOption
	var itp grpc.UnaryServerInterceptor
	itp = func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		err = interceptorTestFunc(ctx)
		if err != nil {
			log.Println("interceptor failed:", err)
			return
		}
		return handler(ctx, req)
	}

	opts = append(opts, grpc.UnaryInterceptor(itp))

	s := grpc.NewServer(opts...)
	pb.RegisterGreeterServer(s, &server{})

	//graceful exit
	go func() {
		select {
		case sig := <-ch:
			log.Printf("Got %s signal. Server will exit.", sig)
			s.GracefulStop()
		}
	}()

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
