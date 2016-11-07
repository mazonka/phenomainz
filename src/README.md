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
```
# bash
su
apt-get update
apt-get install -y subversion make mail g++ sudo nginx 
useradd -m -s /bin/bash dev
passwd dev [***]
useradd -m -s /bin/bash -G dev dat
passwd dat [***]
```

### 1.2 Checkout and build
\# Who: dev

\# Where: /home/dev
```
su - dev
pwd
|    /home/dev
svn ls https://github.com/mazonka/phenomainz.git/trunk/src
svn co https://github.com/mazonka/phenomainz.git/trunk/src
cd src/phenod
make
# make install
# make clean
cd ..
ls -l ~/src/_bin_*
|    total 3188
|    -rwxr-xr-x 1 dev sr 1274600 Nov 5 20:50 phenod
pwd
|    /home/dev/src
cd js/
chmod -R 0775 .
```

### 1.3 Start phenod
\# Who: dat

\# Where: /home/dev/src/js/
```
su dat
cd /home/dev
# option 1 - run in a separate console
/home/dev/bin/phenod 
# option 2 - run in background
nohup /home/dev/bin/phenod &
# test that it is running
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
cp /home/dev/src/img/conf/nginx.conf.deb ./nginx.conf
nginx
```

### 1.5 What: Cook web page files
\# Who: dev
\# Where: /home/dev/src/img/jsclient
```bash
whoami
|    dev
pwd
|    /home/dev/src/img/jsclient
make
```
