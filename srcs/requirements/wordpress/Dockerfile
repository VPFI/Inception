FROM debian:bullseye

RUN apt update && apt install -y php7.4-fpm curl ca-certificates php-mysqli

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

RUN mkdir -p /run/php && chmod 777 /run/php

COPY ./conf/wp_pool.conf /etc/php/7.4/fpm/pool.d/

COPY --chmod=777 ./tools/init_wp.sh /root/init_wp.sh

WORKDIR /var/www/html

EXPOSE 9000

ENTRYPOINT ["/root/init_wp.sh"]
