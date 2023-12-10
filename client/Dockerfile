FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build

ARG API_URL
ARG SERVER_URL
ENV API_URl = $API_URL
ENV SERVER_URL = $SERVER_URL

EXPOSE 3000

CMD ["npm", "run", "start"]