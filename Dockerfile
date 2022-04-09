FROM node:17
RUN git clone https://github.com/Cinkafox/MinkaBot.git
WORKDIR /MinkaBot
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]