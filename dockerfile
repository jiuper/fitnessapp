# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN sed -i 's|base: "/bogokoapp"|base: "/"|' vite.config.ts
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:latest

COPY deploy/nginx.conf.template /etc/nginx/templates/
COPY deploy/generate_nginx_config.sh /usr/local/bin/generate_nginx_config.sh
COPY deploy/certbot_check_and_renew.sh /usr/local/bin/certbot_check_and_renew.sh
COPY --from=build /app/dist /usr/share/nginx/html/

RUN apt-get update && apt-get install -y gettext-base certbot cron && apt-get clean
RUN chmod +x /usr/local/bin/generate_nginx_config.sh /usr/local/bin/certbot_check_and_renew.sh

RUN echo "30 2 * * * /usr/local/bin/certbot_check_and_renew.sh" > /etc/cron.d/certbot_renew
RUN chmod 0644 /etc/cron.d/certbot_renew
RUN crontab /etc/cron.d/certbot_renew

EXPOSE 80
EXPOSE 443

CMD ["generate_nginx_config.sh"]
