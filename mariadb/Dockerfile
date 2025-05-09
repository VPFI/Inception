FROM debian:11.9

RUN apt-get update
RUN apt-get install -y mariadb-server

COPY mdb.cnf /etc/mysql/mariadb.conf.d/
COPY --chmod=777 ./mdb_init.sh .

RUN mkdir -p /var/run/mysqld && \
	chown -R mysql:mysql /var/run/mysqld && \
	chmod 775 /var/run/mysqld

EXPOSE 3306

ENTRYPOINT ["./mdb_init.sh"]

