#!/bin/bash

DATA_DIR=rlang

for file in ./*
do
    if [ ! -d "$file" ];then
        if [ "$file"a != "$0"a ];then
            echo "find $file"
            egrep -o "delay:[0-9]+ ms" $file | egrep -o "[0-9]+" > $DATA_DIR/$file.data
        fi
    fi
done
