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

cmd=`cat cmd.wget`

while read LINE
do

rm -f wget.log wget.out

if test -f $LINE.i; then

	cm="$cmd --post-file=$LINE.i"
	#echo $cm
	$cm

	if cmp $LINE.o wget.out
	then
	echo "$LINE - ok"
	else
	echo $cm
	echo "$LINE - FAILED see wget.out"
	exit 1
	fi

else
	echo "SKIPPED $LINE.i"
fi

rm -f wget.log wget.out
done < cmds.list


