FROM node:14.9.0-alpine3.12 As development
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --only=development
COPY . .
RUN yarn run build
EXPOSE 3000

FROM node:14.9.0-alpine3.12 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]