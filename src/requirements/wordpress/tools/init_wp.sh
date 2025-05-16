#!/bin/bash

if [ ! -f wp-config.php ]; then
	wp core download --allow-root 
	wp config create --dbname=$DB_NAME --dbuser=$DB_USER --dbpass=$DB_USER_PASS --dbhost=$DB_HOST --allow-root
	wp core install --url=$WP_DOMAIN --title="$WP_TITLE" --admin_user=$WP_ADMIN_USER --admin_password=$WP_ADMIN_PASS --admin_email=$WP_ADMIN_EMAIL --skip-email --allow-root
	wp user create $WP_USER $WP_USER_EMAIL --role=author --user_pass=$WP_USER_PASS --allow-root
	wp theme install blogone --activate --allow-root
	wp theme install minimalistix --allow-root
	wp theme install extendable --allow-root
fi

php-fpm7.4 -F