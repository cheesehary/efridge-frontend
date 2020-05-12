FROM node:lts-alpine
WORKDIR /app/frontend
COPY package.json .
COPY yarn.lock .
RUN yarn
ENTRYPOINT [ "yarn", "serve" ]