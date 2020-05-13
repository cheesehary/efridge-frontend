FROM node:lts-alpine
WORKDIR /app/budget-service
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY ./script/entrypoint.sh /
CMD [ "/entrypoint.sh" ]