up:
	mkdir -p /home/$(USER)/data/mariadb/
	mkdir -p /home/$(USER)/data/wordpress/
	docker-compose up --detach --build
down:
	docker-compose down -v

start:
	docker start $$(docker ps -aq)
stop:
	docker stop $$(docker ps -aq)

list:
	@echo "-------- LISTING ALL CONTAINERS --------"
	@docker ps -a
	@echo "\n---------- LISTING ALL IMAGES ----------"
	@docker images
	@echo "\n--------- LISTING ALL VOLUMES ---------"
	@docker volume ls
	@echo "\n--------- LISTING ALL NETWORKS ---------"
	@docker network ls
	@echo "\n"

execDB:
	docker exec -it mariadb mysql -u root

exec:
	@while [ -z "$$TARGET" ]; do \
		read -r -p "Target to exec (mariadb/wordpress/nginx): " TARGET; \
	done; \
	docker exec -it $$TARGET /bin/bash;

rmv:
	docker rm -vf $$(docker ps -aq)
rmi:
	docker rmi -f $$(docker images -aq)

reload: clean up

clean:
	docker-compose down -v --rmi all
	rm -rf /home/$(USER)/data/mariadb/
	rm -rf /home/$(USER)/data/wordpress/

update:
	rm -rf /home/$(USER)/Desktop/inception/*
	cp -R /media/sf_Cursus/Inception/* /home/$(USER)/Desktop/inception/
	cp /media/sf_Cursus/Inception/.env /home/$(USER)/Desktop/inception/
