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

// Package main implements a client for Greeter service.
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"reflect"
	"time"

	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	address     = "localhost:50051"
	defaultName = "world"
)

var methods map[string]reflect.Value

func RegisterGrpcCall(c pb.GreeterClient) {
	methods = make(map[string]reflect.Value)

	t := reflect.TypeOf(c)
	v := reflect.ValueOf(c)
	log.Printf("type info:%T methods:%d", t, t.NumMethod())
	for i := 0; i < t.NumMethod(); i++ {
		m := t.Method(i)
		methods[m.Name] = v.Method(i)
		fmt.Printf("%s: %v %p\n", m.Name, m.Type, v.Method(i))
	}
}

func GrpcCall(method string, ctx context.Context, req interface{}) (interface{}, error) {
	m, ok := methods[method]
	if ok {
		args := []reflect.Value{reflect.ValueOf(ctx), reflect.ValueOf(req)}
		ret := m.Call(args)
		fmt.Printf("return type: %T %T", ret[0].Interface(), ret[1].Interface())
		if ret[1].Interface() == nil {
			return ret[0].Interface(), nil
		} else {
			return ret[0].Interface(), ret[1].Interface().(error)
		}
	}
	return nil, fmt.Errorf("not found methods")
}

func GrpcCallWithFunc(f interface{}, ctx context.Context, req interface{}) {
	type HandlerType func(context.Context, interface{}) interface{}
	fmt.Println("test")
	m, ok := f.(HandlerType) //这种方式不能成功
	if ok {
		fmt.Println("ok")
		HandlerType(m)(ctx, req)
	} else {
		fmt.Println("false")
	}
}

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewGreeterClient(conn)

	RegisterGrpcCall(c)

	// Contact the server and print out its response.
	name := defaultName
	if len(os.Args) > 1 {
		name = os.Args[1]
	}
	for i := 0; i < 10; i++ {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		rsp, err := c.SayHello(ctx, &pb.HelloRequest{Name: name})
		if err != nil {
			log.Printf("could not greet: %v", err)
		} else {
			log.Printf("%d|Call c.SayHello return %+v\n", i, rsp)
		}
		req := &pb.HelloRequest{Name: "a_reflect_call_req"}
		new_rsp, err := GrpcCall("SayHello", ctx, req)
		if err != nil {
			log.Printf("could not greet using GrpcCall: %v", err)
		} else {
			log.Printf("%d|GrpcCall %+v\n", i, new_rsp)
		}

		// req = &pb.HelloRequest{Name: "a_new_call_req"}
		// GrpcCallWithFunc(c.SayHello, ctx, req)
	}
	//log.Printf("Greeting: %s", r.Message)
}
