#!/bin/bash

if [ ! -f /etc/ssl/certs/nginx-incep.crt ]; then
	openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout /etc/ssl/private/nginx-incep.key -out /etc/ssl/certs/nginx-incep.crt -subj "/C=ES/ST=Barcelona/L=Barcelona/O=42fr/CN=vperez.42.fr" 
fi

exec "$@"