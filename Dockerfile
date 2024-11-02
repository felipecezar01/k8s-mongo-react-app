# Use a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Define a variável de ambiente para a porta
ENV PORT=5000

# Expõe a porta
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
