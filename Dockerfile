FROM nginx:alpine

COPY dist/c1-2023-fa-angular /usr/share/nginx/html

# Copia el archivo nginx.conf personalizado al contenedor
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configura Nginx para que escuche en el puerto 4200
EXPOSE 4200

# Comando para iniciar Nginx y servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
