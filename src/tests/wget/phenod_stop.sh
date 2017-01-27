#!/bin/sh

cmd="wget http://localhost:16001 -o wget.log -O wget.out"
$cmd --post-data="command=quit"
rm -f wget.log wget.out

