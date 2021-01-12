FROM node:14

WORKDIR /usr/src/app

COPY ./packages/server/package.json ./
COPY yarn.lock ./
RUN yarn

COPY ./packages/server/ .
COPY ./packages/server/.env .env
RUN ls
RUN yarn add tsc typescript

RUN yarn build

# ENV NODE_ENV production

CMD [ "node", "dist/index.js" ]
USER node