FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY index.js ./
COPY config ./config
COPY routes ./routes

EXPOSE 3000
CMD ["npm", "start"]
