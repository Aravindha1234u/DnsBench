FROM ubuntu:latest

LABEL maintaner="Aravindha Hariharan M <aravindha1234u@gmail.com>"

WORKDIR /usr/src/DnsBench
COPY . .

RUN apt-get update && apt-get install -yqq apt-utils

RUN DEBIAN_FRONTEND="noninteractive" apt-get -yqq install tzdata
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

RUN apt-get install -yqq curl python3 python3-pip

RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -yqq ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb 

RUN apt-get install -yqq python3-tk python3-dev
RUN pip3 install -r requirements.txt
RUN python3 setup.py install

RUN DEBIAN_FRONTEND="noninteractive" apt-get install -yqq xauth xvfb

EXPOSE 8000

RUN chmod +x run.sh
ENTRYPOINT ["./run.sh"]
