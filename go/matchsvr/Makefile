ifeq ($(OS),Windows_NT)
    OS_NAME := win
else
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
        OS_NAME := linux
    endif
    ifeq ($(UNAME_S),Darwin)
        OS_NAME := darwin
    endif
endif

#MATCH_DIR := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))


#export PATH := $(MATCH_DIR)/deps/$(OS_NAME)/bin:$(PATH)
export GOOS := linux

matchsvr: match/match.pb.go main.go
	go build -mod=vendor -o $@

match/match.pb.go: match/match.proto
	protoc --go_out=plugins=grpc:. match/match.proto

clean:
	-rm matchsvr
	-rm match/match.pb.go
