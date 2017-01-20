#!/bin/sh

wget=wget

if $wget --help > /dev/null
then
echo "testing wget -- OK"
else
echo "ERROR: wget is not installed"
exit
fi

die(){ echo $1; exit 1; }


wget http://localhost:16001 -o wget.log -O wget.out --post-data="command=jraf ping"
wget http://localhost:16001 -o wget.log -O wget.out --post-data="command=quit"

