FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY ./packages ./packages
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/ws ./apps/ws

RUN pnpm install
RUN pnpm run db:migrate
RUN pnpm run build

EXPOSE 8080

CMD [ "pnpm", "run", "start:ws" ]