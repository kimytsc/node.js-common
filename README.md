# 목적

하나의 노드로 다중 사이트 관리

## Develop Spec

* CentOS Linux release 7.5.1804 (Core)
* Node.JS 8.11.4
* npm 5.6.0
* MongoDB 4.0.2

## Staging Spec

* CentOS 7 (Core)
* Node.JS 10.8.0
* npm 6.2.0
* MongoDB 4.0.2

## Virtualbox Setup

> Virtualbox에서 symbolic link 옵션 설정
> 
> * https://askubuntu.com/questions/446317/how-to-make-guest-os-follow-symlinks-from-shared-folder
> 
> cd C:\Program Files\Oracle\VirtualBox
> 
> VBoxManage setextradata "Cent OS 7 - Node.JS 10" VBoxInternal2/SharedFoldersEnableSymlinksCreate/workspace 1

## Development Setup

```bash
# root 계정으로 로그인
$ su -

# Node.JS 10.8.0 설치
$ mkdir /usr/src/node
$ cd /usr/src/node
$ wget https://nodejs.org/dist/v10.8.0/node-v10.8.0.tar.gz
$ tar zxf node-v10.8.0.tar.gz
$ mv node-v10.8.0 10.8.0
$ cd 10.8.0
$ ./configure
$ make
$ make install
$ ln -s /usr/src/node/10.8.0/out/Release/node /usr/bin/node
$ node --version
10.8.0

# 어플리케이션이 1024 보다 작은 포트에 바인딩 할 수 있도록 설정
# https://geunhokhim.wordpress.com/2016/03/29/nodejs-error-listen-eacces-0-0-0-0-80/
# NODE_PATH 변수에 node.js 위치 저장
$ NODE_PATH=$(which nodejs)
/usr/bin/nodejs
# node.js의 capability 설정
$ setcap 'cap_net_bind_service=+ep' $NODE_PATH
# capability 설정 확인
$ getcap $NODE_PATH
/usr/bin/nodejs = cap_net_bind_service+ep

# npm 설치
$ cd /usr/src/node/10.8.0/deps/npm
$ ./configure
$ make
$ make install
$ ln -s /usr/src/node/10.8.0/out/lib/node_modules/npm/bin/npm-cli.js /usr/bin/npm
$ npm --version
6.2.0
$ ln -s /usr/src/node/10.8.0/out/lib/node_modules/npm/bin/npx-cli.js /usr/bin/npx
$ npx --version
6.2.0

# pm2 설치
$ npm install pm2 -g
$ ln -s /usr/src/node/10.8.0/out/bin/pm2 /usr/bin/pm2

# nginx 1.14.0 설치
# https://www.nginx.com/resources/wiki/start/topics/tutorials/install/
$ vim /etc/yum.repos.d/nginx.repo
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
$ yum install nginx
$ nginx -v
nginx version: nginx/1.14.0
$ systemctl start nginx
$ systemctl enable nginx

# MongoDB 4.0.X 설치
$ vi /etc/yum.repos.d/mongodb-org.repo
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
$ yum repolist
. . .
repo id                          repo name
base/7/x86_64                    CentOS-7 - Base
extras/7/x86_64                  CentOS-7 - Extras
mongodb-org-4.0/7                MongoDB Repository
updates/7/x86_64                 CentOS-7 - Updates
. . .
$ yum install mongodb-org
$ mongo --version
MongoDB shell version v4.0.2
$ systemctl start mongod
```

## Installing & Setup

<details>
<summary>git clone</summary>

```bash
$ git clone <repository:url> nodejs
$ cd nodejs
```
</details>

<details>
<summary>install</summary>

```bash
$ su –
# root 계정으로 로그인

# 어플리케이션이 1024 보다 작은 포트에 바인딩 할 수 있도록 설정
# https://geunhokhim.wordpress.com/2016/03/29/nodejs-error-listen-eacces-0-0-0-0-80/
$ NODE_PATH=$(which nodejs)
/usr/bin/nodejs
# NODE_PATH 변수에 node.js 위치 저장

$ setcap 'cap_net_bind_service=+ep' $NODE_PATH
# node.js의 capability 설정

$ getcap $NODE_PATH
# capability 설정 확인
/usr/bin/nodejs = cap_net_bind_service+ep

$ npm install pm2 -g
# pm2 모듈 설치
$ exit
# 일반 계정으로 복귀

$ cd <workspace>/nodejs
$ npm install
```
</details>

<details>
<summary>startup</summary>

```bash
$ pm2 start /git/clone/path/ecosystem.config.js

$ pm2 save

$ pm2 startup
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u 계정이름 --hp /home/계정이름

$ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u 계정이름 --hp /home/계정이름
[PM2] Init System found: systemd
Platform systemd
Template
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=계정이름
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/usr/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/home/계정이름/.pm2
PIDFile=/home/계정이름/.pm2/pm2.pid

ExecStart=/usr/lib/node_modules/pm2/bin/pm2 resurrect
ExecReload=/usr/lib/node_modules/pm2/bin/pm2 reload all
ExecStop=/usr/lib/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target

Target path
/etc/systemd/system/pm2-계정이름.service
Command list
[ 'systemctl enable pm2-계정이름' ]
[PM2] Writing init configuration in /etc/systemd/system/pm2-계정이름.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-계정이름...
[PM2] [v] Command successfully executed.
+---------------------------------------+
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup systemd
```

> Node.JS에서 80, 443 포트를 사용하기 위해서는 추가적인 바인딩을 해주어야한다.
> 
> **Link:** https://geunhokhim.wordpress.com/2016/03/29/nodejs-error-listen-eacces-0-0-0-0-80/
</details>

<details>
<summary>unstartup</summary>

```bash
$ pm2 unstartup systemd
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 unstartup systemd -u 계정이름 --hp /home/계정이름
$ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 unstartup systemd -u 계정이름 --hp /home/계정이름
```
</details>

## Environment

### Development
* pm2로 실행할 경우
```bash
$ pm2-dev start ecosystem.config.js --env development
```

* npm으로 실행할 경우
```bash
npm run dev
```

### Staging
* pm2로 실행할 경우
```bash
$ pm2 start ecosystem.config.js --env staging
```

* npm으로 실행할 경우
```bash
$ npm run stag
```

### Production
* pm2로 실행할 경우
```bash
$ pm2 start ecosystem.config.js --env production
```

* npm으로 실행할 경우
```bash
$ npm run prod
```