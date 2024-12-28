#!/bin/bash

CERT_PATH="/etc/letsencrypt/live/${NGINX_SERVER_NAME}/fullchain.pem"

if [ -f "$CERT_PATH" ]; then
    EXPIRATION_DATE=$(openssl x509 -enddate -noout -in "$CERT_PATH" | cut -d= -f2)
    EXPIRATION_TIMESTAMP=$(date -d "$EXPIRATION_DATE" +%s)
    CURRENT_TIMESTAMP=$(date +%s)
    SEVEN_DAYS=$((7 * 24 * 60 * 60))

    if [ $((EXPIRATION_TIMESTAMP - CURRENT_TIMESTAMP)) -le $SEVEN_DAYS ]; then
        certbot renew --webroot -w /usr/share/nginx/html --quiet --no-self-upgrade
    fi
else
    echo "Certificate not found at $CERT_PATH"
fi
