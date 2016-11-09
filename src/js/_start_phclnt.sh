#!/bin/sh
#
# (C) 2016
#

#addr=http://127.0.0.1:16000//phclnt/phclnt.html
addr=http://127.0.0.1:16000


if cmd /c ls 2> /dev/null 1> /dev/null
then
cmd /c start $wb $addr
else
$wb $addr
fi



