# 어떤 이미지로부터 새로운 이미지를 생성할지를 지정
FROM node:10.8.0

#Dockerfile 을 생성/관리하는 사람
MAINTAINER Yongtae Kim <kimytsc@gmail.com>

# Shell 변경 (sh -> bash)
SHELL ["/bin/bash", "-c"]

# Install - pm2
RUN npm install -g pm2

# Install - pageres
# http://pyrasis.com/github/2014/11/22/github-expedition-log#pageres---responsive-website-screenshots
# RUN npm install -g pageres

# Install - nightmare
# http://pyrasis.com/github/2014/11/22/github-expedition-log#nightmare---a-high-level-wrapper-for-phantomjs
# RUN npm install nightmare

WORKDIR /mnt/workspace/nodejs/myapp

# # ENTRYPOINT 설정 docker container에서 pm2를 실행시킬때는 pm2-docker를 통해서 실행합니다.
ENTRYPOINT [ "pm2-docker" ]

# # CMD 설정 - parameter가 없는 경우, default 값을 지정하게 됩니다.
CMD [ "ecosystem.config.js", "--env", "development" ]