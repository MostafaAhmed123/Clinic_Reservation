#!/bin/sh
sed -i 's|{{BACKEND_URL}}|'$BACKEND_URL'|g' /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
