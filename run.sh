#!/bin/bash

xvfb-run --auto-servernum --server-num=1 --server-args='-screen 1 1024x768x24' DnsBench --host 0.0.0.0 &
XVFB=$!

sleep 30

echo -e "\n\n"
echo "You can use DnsBench from your Browser now"
echo "Local URL  : http://127.0.0.1:8000/index.html"

wait $XVFB

