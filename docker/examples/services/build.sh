#!/bin/bash


#build shell svr, using nc -lk port
docker build -t service/shell_svr:3 shell -f shell/Dockerfile-shell


#build a simple python echo server
docker build -t service/python_svr:2 python -f shell/Dockerfile-python

