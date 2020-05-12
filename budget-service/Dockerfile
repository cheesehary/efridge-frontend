FROM node:lts-alpine
WORKDIR /app/budget-service
COPY package.json .
COPY yarn.lock .
RUN yarn
ENTRYPOINT [ "yarn", "dev" ]