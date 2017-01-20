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

cmd="wget http://localhost:16001 -o wget.log -O wget.out"

while read LINE
do
rm wget.out
cm="$cmd --post-file=$LINE.i"
echo $cm
$cm
if cmp $LINE.o wget.out
then
	echo "$LINE - ok"
else
	echo "$LINE - FAILED see wget.out"
	exit
fi
rm -f wget.log wget.out
done < cmds.list


$cmd --post-data="command=quit"
rm -f wget.log wget.out

