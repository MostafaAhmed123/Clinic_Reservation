FROM node:latest AS build

WORKDIR /app

COPY package*.json .

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginxinc/nginx-unprivileged:latest

USER root

COPY --chown=nginx:nginx --from=build /app/dist/clinic-resv-front /var/www/html

COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

COPY --chown=nginx:nginx ./entry.sh /etc/nginx/conf.d/entry.sh
RUN chmod +x /etc/nginx/conf.d/entry.sh

USER nginx

CMD ["/bin/sh", "-c","/etc/nginx/conf.d/entry.sh && nginx -g 'daemon off;'"]
