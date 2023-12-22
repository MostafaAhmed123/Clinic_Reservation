FROM node:latest AS build

WORKDIR /app

COPY package*.json .

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginxinc/nginx-unprivileged:latest

COPY --from=build /app/dist/clinic-resv-front /var/www/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY ./entry.sh /etc/nginx/conf.d/entry.sh
EXPOSE 80

CMD ["/bin/sh", "-c","/etc/nginx/conf.d/entry.sh && nginx -g 'daemon off;'"]
