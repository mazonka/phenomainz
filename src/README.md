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
groupadd gdat
groupadd gdev
useradd -N -m dat -g gdat -G gdev
passwd dat [***]
useradd -N -m dev -g gdev
passwd dev [***]

su dev
bash
cd
```


