FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

ARG API_URL
ARG SERVER_URL
ENV API_URl = $API_URL
ENV SERVER_URL = $SERVER_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]