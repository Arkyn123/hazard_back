FROM node:20-alpine

ENV NODE_TLS_REJECT_UNAUTHORIZED 0
ENV DATABASE_URL postgresql://postgres:root@db:5432/hazard?schema=public
ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./

RUN npm set strict-ssl false && npm i 

COPY prisma/ .

RUN npx prisma db push --schema prisma/hazard/schema.prisma

COPY . .

CMD [ "npm", "run", "start:dev" ]
