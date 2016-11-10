set PL=PLAT=msc

make %PL% clean

cd gl && make %PL% -j 10 && cd ../
cd os && make %PL% -j 10 && cd ../
cd sg && make %PL% -j 10 && cd ../
cd ma && make %PL% -j 10 && cd ../
cd db && make %PL% -j 10 && cd ../
cd pu && make %PL% -j 10 && cd ../
cd q3 && make %PL% -j 10 && cd ../

make %PL%
make %PL%
make %PL%
make %PL%

pause

