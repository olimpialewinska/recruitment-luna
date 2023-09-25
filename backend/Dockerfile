FROM node:18.17-alpine

WORKDIR /usr/app
ENV NODE_ENV development
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY ./package*.json ./
RUN npm ci
COPY . ./

EXPOSE 3001
CMD ["npm", "run", "start"]

