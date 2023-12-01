REM removing duplicates
docker stop mysqldb
docker rm mysqldb
docker stop backend
docker rm backend
docker stop frontend
docker rm frontend
docker network rm db-backend-network

REM building images
cd backend
docker build -t backend-image .
cd ../frontend
docker build -t frontend-image .

cd ../MySQL
docker build -t mysqldb-image .

REM building networks
docker network create db-backend-network

REM building up containers
docker run -d -p 3306:3306 --name mysqldb --net db-backend-network -e MYSQL_ROOT_PASSWORD=Hana.2002 -e MYSQL_DATABASE=clinic mysqldb-image
docker run -d -p 4200:4200 --name frontend frontend-image
docker run -d -p 8000:8000 --name backend --net db-backend-network backend-image

REM fixing backend issues
timeout /nobreak /t 10
docker network connect db-backend-network backend
docker restart backend
