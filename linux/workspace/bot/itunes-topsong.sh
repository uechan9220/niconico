#!/bin/bash
email="fuga@email.com"
dirname="/home/vagrant/workspace/niconico-ranking-rss"
mkdir -p $dirname
filename="${dirname}/hourly-ranking-`date +'%Y%m%d%H%M'`.xml"
echo "Save to $filename"
curl -s -o $filename -H "User-Agent: CrawBot; $email" https://itunes.apple.com/jp/rss/topsongs/limit=10/xm