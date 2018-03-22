FROM mhart/alpine-node:8
RUN apk add --update --no-cache git python g++ make
USER root
ARG ENV_FILE=stage

VOLUME /usr/src/app
WORKDIR /usr/src/app
