FROM ubuntu:16.04
RUN sed -i 's#http://archive.ubuntu.com#http://mirrors.163.com#g' /etc/apt/sources.list  && \
        apt-get update && apt-get -y install g++ make

COPY sum.cpp Makefile /home/use_docker_as_api/
WORKDIR /home/use_docker_as_api/

RUN make
ENTRYPOINT ["./sum"]


