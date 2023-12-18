FROM node:latest AS build

WORKDIR /app

COPY package*.json .

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest

COPY --from=build app/dist/clinic-resv-front /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
