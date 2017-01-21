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

sh phenod_start.sh || die "starting phenod failed"
sh wget_cmds.sh || die "Commands failed"

