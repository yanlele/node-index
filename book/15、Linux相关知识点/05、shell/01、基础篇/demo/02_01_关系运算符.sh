#!/usr/bin/env bash

a=10
b=20
if [[ ${a} -eq ${b} ]]; then
    echo "${a} -eq ${b} : a is equal to b"
else
    echo "${a} -eq ${b} : a is not equal to b"
fi
