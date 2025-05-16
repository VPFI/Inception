#!/bin/bash

DB_USER=$(cat $SECRET_PATH/db_user)
DB_USER_PASS=$(cat $SECRET_PATH/db_pass)
DB_ROOT_PASS=$(cat $SECRET_PATH/root_pass)

mysqld_safe --skip-networking &

until mysqladmin ping --silent --connect-timeout=2; do
  sleep 1
done

if [ ! -d /var/lib/mysql/$DB_NAME ]; then
	mysql -u $DB_ROOT -p$DB_ROOT_PASS -e "CREATE DATABASE $DB_NAME;"
	mysql -e "CREATE USER '$DB_USER'@'%' IDENTIFIED BY '$DB_USER_PASS';"
	mysql -e "GRANT ALL ON $DB_NAME.* TO '$DB_USER'@'%' IDENTIFIED BY '$DB_USER_PASS' WITH GRANT OPTION;"
	mysql -e "FLUSH PRIVILEGES;"
fi

mysqladmin shutdown

exec "$@"
