# https://yoonbh2714.blogspot.com/2017/11/locale.html
# http://netframework.tistory.com/entry/nodejs-pm2-git%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-Dockfile-%EA%B5%AC%EC%84%B1
# http://bluese05.tistory.com/15

# � �̹����κ��� ���ο� �̹����� ���������� ����
FROM centos:7.5.1804

#Dockerfile �� ����/�����ϴ� ���
MAINTAINER Yongtae Kim <kimytsc@gmail.com>

# Shell ���� (sh -> bash)
SHELL ["/bin/bash", "-c"]

# �⺻ ��Ű�� ��ġ
RUN yum install -y sudo tar git rsync gcc gcc-c++ net-tools which iproute man-pages man setuptool ncurses-devel python-devel libevent-expat-devel bzip2-devel openssh-server wget

# ���� ��Ű�� ��ġ
RUN yum groupinstall -y 'development tools'

# ��� ����
RUN localedef -f UTF-8 -i ko_KR ko_KR.utf8 && ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# Node.JS 10.8.0 ��ġ
RUN mkdir /usr/src/node
RUN wget https://nodejs.org/dist/v10.8.0/node-v10.8.0.tar.gz
RUN tar zxf node-v10.8.0.tar.gz -C /usr/src/node
RUN mv /usr/src/node/node-v10.8.0 /usr/src/node/10.8.0
WORKDIR /usr/src/node/10.8.0
RUN ./configure
RUN make
RUN make install
RUN ln -s /usr/src/node/10.8.0/out/Release/node /usr/bin/node
RUN node --version

# Install - pm2
RUN npm install -g pm2

# Install - pageres
# http://pyrasis.com/github/2014/11/22/github-expedition-log#pageres---responsive-website-screenshots
# RUN npm install -g pageres

# Install - nightmare
# http://pyrasis.com/github/2014/11/22/github-expedition-log#nightmare---a-high-level-wrapper-for-phantomjs
# RUN npm install nightmare

WORKDIR /mnt/workspace/nodejs/myapp

# ENTRYPOINT ���� docker container���� pm2�� �����ų���� pm2-docker�� ���ؼ� �����մϴ�.
ENTRYPOINT [ "pm2-docker" ]

# CMD ���� - parameter�� ���� ���, default ���� �����ϰ� �˴ϴ�.
CMD [ "ecosystem.config.js", "--env", "development" ]