FROM debian:11.9

RUN apt update
RUN apt install -y nginx openssl

COPY --chmod=777 ./nginx_start.sh .

EXPOSE 443

ENTRYPOINT ["./nginx_start.sh"]
CMD ["nginx","-g","daemon off;"]