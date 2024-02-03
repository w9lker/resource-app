FROM node:16

RUN mkdir -p /app

WORKDIR /app

COPY api/package*.json ./

RUN npm install

COPY api/ ./

EXPOSE $PORT

ENV HOST = $HOST

ENV DB_HOST = $DB_HOST

ENV DB_USER = $DB_USER

ENV DB_NAME = $DB_NAME

ENV DB_PASSWORD = $DB_PASSWORD

CMD ["npm","start"]