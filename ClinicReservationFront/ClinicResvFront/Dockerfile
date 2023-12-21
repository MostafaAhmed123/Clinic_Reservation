FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginxinc/nginx-unprivileged:latest

COPY --from=build /app/dist/clinic-resv-front /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["/bin/sh", "-c", "sed -i 's|{{BACKEND_URL}}|'$BACKEND_URL'|g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
