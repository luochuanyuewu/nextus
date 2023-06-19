
FROM node:18-alpine
# Installing libvips-dev for sharp Compatability
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV} NPM_TOKEN=${NPM_TOKEN}
WORKDIR /opt/
COPY ./package.json ./yarn.lock ./.npmrc ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn config set registry http://registry.npm.taobao.org/ && yarn install
WORKDIR /opt/app
COPY ./ .
RUN yarn install-plugin && yarn build-plugin && yarn build
EXPOSE 1337
CMD ["yarn", "develop"]
