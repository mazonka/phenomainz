#!/bin/sh
#
# (C) 2016
#

addr=http://127.0.0.1:16000/pheno/phclnt.html


if cmd /c ls 2> /dev/null 1> /dev/null
then
cmd /c start $wb $addr
else
$wb $addr
fi



