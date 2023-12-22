FROM node:latest AS build

WORKDIR /app

COPY package*.json .

COPY . .
RUN npm install
RUN npm run build --prod

# Create a temporary user for the build stage
USER root

# Copy entry.sh and change its permissions
COPY ./entry.sh /etc/nginx/conf.d/entry.sh
RUN chmod +x /etc/nginx/conf.d/entry.sh

# Switch back to a non-root user
USER node

FROM nginxinc/nginx-unprivileged:latest

COPY --from=build /app/dist/clinic-resv-front /var/www/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# No need to copy entry.sh again

EXPOSE 80

CMD ["/bin/sh", "-c","/etc/nginx/conf.d/entry.sh && nginx -g 'daemon off;'"]
