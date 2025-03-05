# Etapa de build
FROM node:16-alpine AS build-stage

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Constrói a aplicação para produção
RUN npm run build

# Etapa de produção
FROM nginx:stable-alpine AS production-stage

# Copia os arquivos construídos para o diretório do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]