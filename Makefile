up:
	mkdir -p /home/$(USER)/data/mariadb
	docker-compose up --detach --build
down:
	docker-compose down
run:
	docker run -d -p 3306:3306 --name mariadb mariadb
exec:
	docker exec -it mariadb mysql -u root

#del all conatiners + volumes
rmv:
	docker rm -vf $$(docker ps -aq)

#del all images
rmi:
	docker rmi -f $$(docker images -aq)

clean: rmv rmi
	rm -rf /home/$(USER)/data/mariadb
