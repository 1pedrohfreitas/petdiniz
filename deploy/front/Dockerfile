FROM nginx:1.21.6-alpine

LABEL AUTHOR="Pedro Henrique Freitas"
ADD dist /usr/share/nginx/html
RUN cat /etc/nginx/nginx.conf
RUN ls /etc/nginx/conf.d/
ADD ./nginx.conf /etc/nginx/
EXPOSE 80 443
CMD ["nginx","-g","daemon off;"]