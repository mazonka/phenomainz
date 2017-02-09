#!/bin/sh

if [ "$2" == "" ]; then
echo Use name1 name2
exit
fi

if [ "$2" == "$1" ]; then
echo Same names
exit
fi

cp $1.inp $2.inp
cp $1.sts $2.sts
cp $1.gold $2.gold

#svn add $2.*


