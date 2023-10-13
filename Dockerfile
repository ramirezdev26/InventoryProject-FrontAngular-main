FROM nginx:alpine

COPY dist/c1-2023-fa-angular /usr/share/nginx/html

# Copia el archivo nginx.conf personalizado al contenedor
COPY nginx.conf /etc/nginx/conf.d/default.conf


COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 4200

RUN chmod +x /entrypoint.sh

# Comando para iniciar Nginx y servir la aplicación
CMD ["/entrypoint.sh"]
