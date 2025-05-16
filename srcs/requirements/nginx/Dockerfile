FROM debian:11.9

RUN apt update
RUN apt install -y nginx openssl

COPY ./conf/nginx.conf /etc/nginx/sites-enabled/
COPY --chmod=777 ./tools/nginx_start.sh /root/

EXPOSE 443

ENTRYPOINT ["/root/nginx_start.sh"]
CMD ["nginx","-g","daemon off;"]