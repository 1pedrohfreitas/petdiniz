FROM node:alpine3.15

RUN apk add  --no-cache ffmpeg

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000
EXPOSE 1935

CMD [ "node", "app.js" ]

