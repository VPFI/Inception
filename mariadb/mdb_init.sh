#!/bin/bash

service mariadb start

if [ ! -d /var/lib/mysql/$DB_NAME ]
then
	mysql -u $DB_ROOT -p$DB_ROOT_PASS -e "CREATE DATABASE $DB_NAME;"
	mysql -e "CREATE USER 'DB_USER'@'%' IDENTIFIED BY '$DB_PASS';"
	mysql -e "GRANT ALL ON $DB_NAME.* TO '$DB_USER'@'%' IDENTIFIED BY '$DB_PASS' WITH GRANT OPTION;"
	mysql -e "FLUSH PRIVILEGES;"
fi

service mariadb stop
exec "$@"
