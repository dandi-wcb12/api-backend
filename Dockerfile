FROM node:18
COPY package*.json ./
RUN npm install

COPY . .

ENV PORT 8080

CMD ["npm", "run", "start-prod"]