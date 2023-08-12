# Use a base image com suporte para Node.js
FROM node:14

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos necessários
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
