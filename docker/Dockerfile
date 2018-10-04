# 어떤 이미지로부터 새로운 이미지를 생성할지를 지정
FROM centos:7.5.1804

#Dockerfile 을 생성/관리하는 사람
MAINTAINER Yongtae Kim <kimytsc@gmail.com>

# Shell 변경 (sh -> bash)
SHELL ["/bin/bash", "-c"]

# https://yoonbh2714.blogspot.com/2017/11/locale.html
# 기본 패키지 설치
RUN yum install -y sudo tar git rsync gcc gcc-c++ net-tools which iproute man-pages man setuptool ncurses-devel python-devel libevent-expat-devel bzip2-devel openssh-server
# 개발 패키지 설치
RUN yum groupinstall -y 'development tools'
# 언어 설정
RUN localedef -f UTF-8 -i ko_KR ko_KR.utf8 && ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# Node.JS 10.8.0 설치
RUN mkdir /usr/src/node
COPY ./node-v10.8.0.tar.gz /usr/src/node
RUN tar zxf /usr/src/node/node-v10.8.0.tar.gz -C /usr/src/node
RUN mv /usr/src/node/node-v10.8.0 /usr/src/node/10.8.0
WORKDIR /usr/src/node/10.8.0
RUN ./configure
RUN make
RUN make install
RUN ln -s /usr/src/node/10.8.0/out/Release/node /usr/bin/node
RUN node --version

RUN npm install -g pm2






################################################################
# 소스 복사
#COPY . /usr/src/app

#WORKDIR /usr/src/app
#RUN npm install

#RUN pm2 start ecosystem.config.js --env development

# 가상 머신에 오픈할 포트
# EXPOSE 3000 80
# EXPOSE 3443 443

# 컨테이너에서 실행될 명령을 지정
# CMD ["pm2", "save"]