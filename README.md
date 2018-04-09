# gh-proxy
[![Build Status](https://travis-ci.org/yuta1024/gh-proxy.svg?branch=master)](https://travis-ci.org/yuta1024/gh-proxy)

## Introduction
Provide some functions for Google Home with IFTTT

## Requirements
- docker-ce >= 18.03.0+
- docker-compose >= 1.20.1

## Setup
Replace following in docker-compose.yml
- `PORT`: A listening port of gh-proxy
- `TOKEN`: A token authenticating the request
- `DOMAIN` and `IP_ADDR`: Please check [https-portal](https://github.com/SteveLTN/https-portal)

## WoL
### Request
```shell
$ curl "https://<DOMAIN>/wol?token=<TOKEN>&mac_addr=<MAC_ADDR>"
```
