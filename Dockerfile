FROM node:lts-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN yarn && yarn build

ENV NODE_ENV production

# Change 3000 to your application listening port
EXPOSE 3000

CMD yarn start
