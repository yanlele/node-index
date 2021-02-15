#!/bin/bash

port=8081
#根据端口号查询对应的pid

# shellcheck disable=SC2046
kill -9 $(lsof -i :$port |awk '{print $2}' | tail -n 2)
