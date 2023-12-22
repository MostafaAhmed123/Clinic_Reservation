#!/bin/bash

if [ -z "$BACKEND_URL" ]; then
    echo "Please set the BACKEND_URL environment variable."
    exit 1
fi


NGINX_CONF="/etc/nginx/conf.d/default.conf"


sed -i "s|proxy_pass .*;|proxy_pass $BACKEND_URL;|g" $NGINX_CONF

echo "nginx.conf has been updated."
echo "backend is up and running  $BACKEND_URL"
