FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

ARG SERVER_URL
ENV SERVER_URl = $SERVER_URL
ARG API_URL
ENV API_URl = $API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]