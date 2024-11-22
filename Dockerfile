# 1. Usa una imagen base de Node.js para construir la aplicación
FROM node:18 AS builder

# 2. Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copia los archivos del proyecto al contenedor
COPY package*.json ./
COPY vite.config.* ./

# Copia todos los archivos de la app
COPY . .  

# 4. Instala las dependencias y construye la aplicación
RUN npm install
RUN npm run build

# 5. Usa una imagen más ligera para servir los archivos estáticos
FROM nginx:stable-alpine

# 6. Copia el build generado por Vite al directorio de NGINX
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# 7. Exponer el puerto que usará NGINX
EXPOSE 80

# 8. Configuración por defecto de NGINX para servir archivos
CMD ["nginx", "-g", "daemon off;"]
