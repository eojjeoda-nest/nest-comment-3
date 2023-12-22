FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 8000
CMD ["yarn", "start"]
