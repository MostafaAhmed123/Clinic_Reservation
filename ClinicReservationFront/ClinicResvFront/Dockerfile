FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest

COPY --from=build /app/dist/clinic-resv-front /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod 755 /etc/nginx/conf.d/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80

CMD ["/entrypoint.sh"]
