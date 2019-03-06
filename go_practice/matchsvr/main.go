package main

import (
    "context"
    log "github.com/sirupsen/logrus"
    "fmt"
	"net"
	"google.golang.org/grpc"
    pb "matchsvr/match"
)

const (
    port = 10000
)

type server struct{}

func (s *server) TryMatch(ctx context.Context, req *pb.TryMatchRequest) (*pb.TryMatchResponse, error) {
    log.Infof("Recv TryMatch: %v", req.GetClientIp())
    resp := pb.TryMatchResponse{RetInfo: &pb.RetInfo{Ret: 0, ErrMsg: "no err"}}
    return &resp, nil
}

func (s *server)GetStatus(ctx context.Context, req *pb.GetStatusRequest) (*pb.GetStatusResponse, error) {
    log.Infof("Recv TryMatch: %v", req.GetClientIp())
    resp := pb.GetStatusResponse{RetInfo: &pb.RetInfo{Ret: 1, ErrMsg:"matching..."}}
    return &resp, nil
}

func main() {
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterMatchServServer(grpcServer, &server{})

    log.Infof("matchsvr started.")
    if err:= grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
    }
}

