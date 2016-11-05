#!/bin/sh
#
# (C) 2016
#

PLAT=${PLAT:-msc}
BIN=_bin_${PLAT}

echo ${BIN}

comm="../$BIN/phenod webroot=. webdir=phclnt tcp_port=16000 dprn=1 dpul=1 dced=1 dwkr=1 cycle=10000"

error() {
	[ -z "$1" ] || echo ">>> $1"
	exit 1
}


[ "$?" -eq 0 ] || error

if cmd /c ls 2> /dev/null 1> /dev/null
then
cmd /c start $comm
else
$comm
fi


