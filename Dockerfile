FROM node:17
RUN git clone https://github.com/Cinkafox/MinkaBot.git /MinkaBot
WORKDIR /MinkaBot
RUN ls
COPY . .
RUN npm install
RUN node index.js