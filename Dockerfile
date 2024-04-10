FROM node:20-alpine

ENV HTTP_PROXY ${HTTP_PROXY}
ENV HTTPS_PROXY ${HTTPS_PROXY}
ENV NODE_TLS_REJECT_UNAUTHORIZED 0
ENV DATABASE_URL postgresql://postgres:root@db:5432/hazard?schema=public
ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./

RUN npm set strict-ssl false && npm i 

COPY . .

ENTRYPOINT sleep 3 && npx prisma db push --schema prisma/hazard/schema.prisma && sleep 3 && npm run start:dev

