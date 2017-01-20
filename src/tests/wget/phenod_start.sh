#!/bin/sh

cwd=`pwd`
test -f /usr/bin/cygpath && cwd=`cygpath -m $cwd`

# detect platform
PLAT=`sh platform.sh`
execdir=_bin_${PLAT}
echo "Platform detected $PLAT"

xpwd=`sh execdir.sh`
echo "phenod found at $xpwd"
cd $xpwd

rm -rf wroot
opt1="phdb=wget.db jraf_root=wroot tcp_port=16001 skcseed=1"
comm="./phenod -cqx dwkr=1 quit=1 $opt1"
echo $comm

if cmd /c ls 2> /dev/null 1> /dev/null
then
cmd /c start $comm
else
./$comm
fi

cd $cwd