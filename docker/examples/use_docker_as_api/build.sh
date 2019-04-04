#!/bin/bash


dk run -it --privileged=true --rm -v "$PWD"/data:/data/mydata/  --name sum5 use_docker_as_api:v1 /data/mydata/data.txt
