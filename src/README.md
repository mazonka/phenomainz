Intallation instruction
=======================
1. Clean installation on empty Debian
2. New installation - nginx, g++, make exist
3. Upgrade soft - retain database

1. Clean installation (Debian)
------------------------------
### 1.1 Initial setup
\# Who: root

\# Where:
```bash
su
apt-get update
apt-get install -y subversion make g++ sudo nginx
groupadd gfdat
groupadd gfdev
useradd -N -m fdat -g gfdat -G gfdev
passwd fdat [***]
useradd -N -m fdev -g gfdev
passwd fdev [***]
su dev
bash
cd
```

### 1.2 Checkout and build
\# Who: fdev

\# Where: /home/fdev
```bash
pwd
|    /home/fdev
svn ls https://github.com/mazonka/phenomainz.git/trunk/src
svn co https://github.com/mazonka/phenomainz.git/trunk/src
cd src
make
make install
make clean
cd ..
ls -l ~/bin
|    total 3188
|    -rwxr-xr-x 1 dev sr 1163380 Apr 23 06:33 phenod
pwd
|    /home/fdev/src
cd img/jsclient/
chmod 0775 .
```

### 1.3 Start phenod
\# Who: hasq
\# Where: /home/fdev/src/img/jsclient/
```bash
su fdat
cd /home/fdev
\# option 1 - run in a separate console
/home/fdev/bin/fenod 
\# option 2 - run in background
nohup /home/fdev/bin/fenod &
\# test that it is running
telnet localhost 13131
wget http://localhost:13131/ping -qO -
|    OK
```

### 1.4 What: Restart nginx
\# Who: root
\# Where: /etc/nginx
```bash
su
pwd
|    /etc/nginx
nginx -s stop
cp ./nginx.conf ./nginx.conf.ori
cp /home/fdev/src/img/conf/nginx.conf.deb ./nginx.conf
nginx
```

### 1.5 What: Cook web page files
\# Who: dev
\# Where: /home/fdev/src/img/jsclient
```bash
whoami
|    fdev
pwd
|    /home/dev/src/img/jsclient
make
```
