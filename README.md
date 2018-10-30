# One port Multi domain

## Develop Spec

* CentOS Linux release 7.5.1804 (Core)
* Node.JS ~~8.11.4~~ 10.8.0
* npm ~~5.6.0~~ 6.2.0
* MongoDB 4.0.2

## Staging Spec

* CentOS 7 (Core)
* Node.JS 10.8.0
* npm 6.2.0
* MongoDB 4.0.2

## Installing & Setup

* Install Docker for Windows 7
```bash
# http://pseg.or.kr/pseg/infoinstall/6076
# https://docs.docker.com/toolbox/toolbox_install_windows
# https://download.docker.com/win/stable/DockerToolbox.exe
```

* Install Docker for Windows 10
```bash
# https://docs.docker.com/docker-for-windows/
# https://store.docker.com/editions/community/docker-ce-desktop-windows
```

* Virtualbox Setup
```bash
# Virtualbox에서 symbolic link 옵션 설정
# https://askubuntu.com/questions/446317/how-to-make-guest-os-follow-symlinks-from-shared-folder
> cd C:\Program Files\Oracle\VirtualBox
> VBoxManage setextradata "default" VBoxInternal2/SharedFoldersEnableSymlinksCreate/workspace 1

# default 이미지의 공유폴더로 workspace 설정
# 머신폴더(workspace) / 경로(N:\path\your\source)
```

* Git clone
```bash
$ git clone <repository:url> nodejs
$ cd nodejs
```

* Build docker container
```bash
$ docker-compose build && docker-compose up -d --force-recreate
```

* Setup hosts
```bash
# 192.168.99.100	dev-examnode.localhost.co.kr
# 192.168.99.100	dev-dbmoniter.localhost.co.kr
```


## Environment

### Development
* pm2 deploy
```bash
# http://pm2.keymetrics.io/docs/usage/deployment
# If you want to deploy without pushing any data, you can append the --force option
$ pm2 deploy ecosystem.config.js development
```

* pm2로 실행할 경우
```bash
$ pm2 start ecosystem.config.js --env development
```

* npm으로 실행할 경우
```bash
npm run dev
```

### Staging
* pm2 deploy
```bash
# http://pm2.keymetrics.io/docs/usage/deployment
# If you want to deploy without pushing any data, you can append the --force option
$ pm2 deploy ecosystem.config.js staging
```

* pm2로 실행할 경우
```bash
$ pm2 start ecosystem.config.js --env staging
```

* npm으로 실행할 경우
```bash
$ npm run stag
```

### Production
* pm2 deploy
```bash
# http://pm2.keymetrics.io/docs/usage/deployment
# If you want to deploy without pushing any data, you can append the --force option
$ pm2 deploy ecosystem.config.js production
```

* pm2로 실행할 경우
```bash
$ pm2 start ecosystem.config.js --env production
```

* npm으로 실행할 경우
```bash
$ npm run prod
```