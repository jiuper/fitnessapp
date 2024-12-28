#!/bin/bash

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Проверка необходимых переменных окружения
if [ -z "${NGINX_SERVER_NAME}" ] || [ -z "${NGINX_INTERNAL_API_URL}" ]; then
    log "Error: NGINX_SERVER_NAME and NGINX_INTERNAL_API_URL must be set."
    exit 1
fi

if [ "${NGINX_SECURE}" = "true" ]; then
    if [ -z "${LETSENCRYPT_EMAIL}" ]; then
        log "Error: LETSENCRYPT_EMAIL must be set for Let's Encrypt."
        exit 1
    fi

    NGINX_SSL_CERTIFICATE=/etc/letsencrypt/live/${NGINX_SERVER_NAME}/fullchain.pem
    NGINX_SSL_CERTIFICATE_KEY=/etc/letsencrypt/live/${NGINX_SERVER_NAME}/privkey.pem

    if [ ! -f $NGINX_SSL_CERTIFICATE ] || [ ! -f $NGINX_SSL_CERTIFICATE_KEY ]; then
        log "Starting Nginx for Certbot verification."
        nginx -g 'daemon off;' &

        log "Obtaining Let's Encrypt certificate."
        certbot certonly --webroot -w /usr/share/nginx/html -d ${NGINX_SERVER_NAME} --non-interactive --agree-tos --email ${LETSENCRYPT_EMAIL}

        if [ $? -ne 0 ]; then
            log "Failed to obtain Let's Encrypt certificate. Generating self-signed certificate."
            NGINX_SSL_CERTIFICATE=/etc/nginx/ssl/self-signed/${NGINX_SERVER_NAME}.crt
            NGINX_SSL_CERTIFICATE_KEY=/etc/nginx/ssl/self-signed/${NGINX_SERVER_NAME}.key
            mkdir -p /etc/nginx/ssl
            openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
                -keyout $NGINX_SSL_CERTIFICATE_KEY -out $NGINX_SSL_CERTIFICATE \
                -subj "/CN=${NGINX_SERVER_NAME}"
        fi

        log "Stopping Nginx after Certbot verification."
        pkill nginx
    fi

    NGINX_REDIRECT_TO_HTTPS="if (\$scheme != \"https\") { return 302 https://\$host\$request_uri; }"
    NGINX_HTTPS_CONFIG="server {
        listen 443 ssl;
        server_name ${NGINX_SERVER_NAME};

        ssl_certificate ${NGINX_SSL_CERTIFICATE};
        ssl_certificate_key ${NGINX_SSL_CERTIFICATE_KEY};

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files \$uri \$uri/ /index.html;
        }

        location /api {
            proxy_pass ${NGINX_INTERNAL_API_URL};
        }
    }"
else
    NGINX_REDIRECT_TO_HTTPS=""
    NGINX_HTTPS_CONFIG=""
fi

log "Generating Nginx configuration file."

awk -v server_name="${NGINX_SERVER_NAME}" \
    -v internal_api_url="${NGINX_INTERNAL_API_URL}" \
    -v redirect_to_https="${NGINX_REDIRECT_TO_HTTPS}" \
    -v https_config="${NGINX_HTTPS_CONFIG}" \
    '{
        gsub(/__NGINX_SERVER_NAME__/, server_name);
        gsub(/__NGINX_INTERNAL_API_URL__/, internal_api_url);
        gsub(/__NGINX_REDIRECT_TO_HTTPS__/, redirect_to_https);
        gsub(/__NGINX_HTTPS_CONFIG__/, https_config);
        print
    }' /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/${NGINX_SERVER_NAME}.conf

log "Generated Nginx configuration:"
cat /etc/nginx/conf.d/${NGINX_SERVER_NAME}.conf

log "Starting Nginx."
exec nginx -g 'daemon off;'
