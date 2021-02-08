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

# multi-staged sample
# FROM node:14.4.0 AS build
# COPY . .
# RUN npm ci && npm run build
# FROM node:slim-14.4.0
# USER node
# EXPOSE 8080
# COPY --from=build /home/node/app/dist /home/node/app/package.json /home/node/app/package-lock.json ./
# RUN npm ci --production
# CMD [ "node", "dist/app.js" ]