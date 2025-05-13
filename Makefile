up:
	mkdir -p /home/$(USER)/data/mariadb/
	mkdir -p /home/$(USER)/data/wordpress/
#	mkdir -p /etc/ssl/private/
#	mkdir -p /etc/ssl/certs/
	docker-compose up --detach --build
down:
	docker-compose down

start:
	docker start $$(docker ps -aq)
stop:
	docker stop $$(docker ps -aq)

list:
	@echo "-------- LISTING ALL CONTAINERS --------"
	@docker ps -a
	@echo "\n---------- LISTING ALL IMAGES ----------"
	@docker images
	@echo "\n"

run:
	docker run -d -p 3306:3306 --name mariadb mariadb

execDB:
	docker exec -it mariadb mysql -u root

#del all conatiners + volumes
rmv:
	docker rm -vf $$(docker ps -aq)
#del all images
rmi:
	docker rmi -f $$(docker images -aq)

clean: rmv rmi
	rm -rf /home/$(USER)/data/mariadb/
	rm -rf /home/$(USER)/data/wordpress/
#	rm -rf /etc/ssl/private/
#	rm -rf /etc/ssl/certs/

update:
	rm -rf /home/$(USER)/Desktop/inception/*
	cp -R /media/sf_Cursus/Inception/* /home/$(USER)/Desktop/inception/
	cp /media/sf_Cursus/Inception/.env /home/$(USER)/Desktop/inception/
