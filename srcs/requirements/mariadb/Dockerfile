FROM debian:11.9

RUN apt update
RUN apt install -y mariadb-server

COPY ./conf/mdb.cnf /etc/mysql/mariadb.conf.d/
RUN chmod 644 /etc/mysql/mariadb.conf.d/mdb.cnf

COPY --chmod=777 ./tools/mdb_init.sh /root/

RUN mkdir -p /var/run/mysqld && \
	chown -R mysql:mysql /var/run/mysqld && \
	chmod 775 /var/run/mysqld

EXPOSE 3306

ENTRYPOINT ["/root/mdb_init.sh"]
CMD ["mysqld"]

