<p align="center"><img src="https://i.imgur.com/66gWHaR.png" style="width:100px;height:100px;"/></p>
<br>
<h1 align="center">DnsBench</h1>
<h3 align="center">Multi-Threaded Python Application for Dns Benchmark</h3>
<p align="center">Created by <a href="https://github.com/aravindha1234u">Aravindha Hariharan M</a> & <a href="https://github.com/manofsteel0007">Kumaran S</a></p>
<br>
<p align="center">
  <img src="https://img.shields.io/badge/python-v3.7-blue" alt="Python V3.7">
  <img src="https://img.shields.io/badge/build-passed-brightgreen" alt="build status">
  <img src="https://img.shields.io/badge/analyze-passed-rightgreen" alt="Analyze">
  <img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen" alt="Test">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>
<br>

## Getting Started
<br>
<p>This is Benchmark application to pick your best DNS provider according to your ISP(Internet Service Provider).This check over 55+ public DNS server and find the <b>Best and Optimistic Server</b>.</p>
<p>NOTE: Currently this application only uses ipv4 of DNS providers, because DNS providers are blocked by your ISP.</p>
<br>

![Screenshot1](https://i.imgur.com/eizl7cV.png)

<br><hr><br>

## Prerequisites

```
To have the interface displayed in the images, you will need chrome. If chrome is not installed or --no-chrome is supplied, the default browser will be used.

As of PyInstaller 4.0, Python 2.7 is no longer supported. Read "Python 2.7 Support" below for steps on how to use this tool with Python 2.7.
```

## Installation and Usage

### Installing Via PyPI
You can install this project using PyPI:

```
$ pip install DnsBench
```

Then to run it, execute the following in the terminal:

```
$ DnsBench
```

### Installing Via GitHub
```
$ git clone https://github.com/aravindha1234u/dnsbench
$ cd dnsbench
$ python3 setup.py install
```

Then to run it, execute the following in the terminal:

```
$ DnsBench
```

### Run from source code

```
$ git clone https://github.com/aravindha1234u/dnsbench
$ cd dnsbench
$ pip install -r requirements.txt
```

Then to run it, execute the following in the terminal:

```
$ python3 dnsbench.py
```

### Update DnsBench

<br>

```
$ pip install -U DnsBench
```

## Docker

By pulling the image from Docker Hub
```
docker run --name=DnsBench \
      --restart=always \
      -p 8000:8000 \
      aravindha1234u/dnsbench:latest
```

From Git Repository

```
docker build -t dnsbench .

docker run --name=DnsBench \
      -p 8000:8000 \
      --restart=always \
      dnsbench:latest
```

<hr><br>

## Application working
<br>

![Screenrecord](https://imgur.com/1oESmVC.png)

<br>

## Issues

Feel free to express any kind of bug or error in this tool by reporting it in issues, So that it can be fixed soon.

## License

DnsBench is licensed under MIT, Take a look at the [License](https://github.com/Aravindha1234u/DnsBench/blob/master/LICENSE)