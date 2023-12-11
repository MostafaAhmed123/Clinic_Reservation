REM removing exisiting containers
docker rm -f frontend
docker rm -f backend
docker rm -f database
docker network rm dbbackend1

REM building images
docker build -t backend:final .

cd ClinicReservationFront/ClinicResvFront
docker build -t frontend:final .
S
cd ../../Database
docker build -t database:v1 .

REM creating needed networks
docker network create dbbackend1

REM running containers
docker run -d --name database -p 3306:3306 --net dbbackend1 -e MYSQL_ROOT_PASSWORD=Hana.2002 -e MYSQL_DATABASE=clinic database:v1
docker run -d --name backend -p 8000:8000 --net dbbackend1 -e DATABASE_NAME=clinic -e DATABASE_PASSWORD=Hana.2002 -e DATABASE_PORT=3306 --restart always backend:final
docker run -d --name frontend -p 4200:4200 frontend:final