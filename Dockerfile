FROM node:18-alpine
COPY package*.json ./
RUN npm install
ENV HOST 0.0.0.0
WORKDIR /app
COPY . .
ENV PORT 8080
CMD ["npm", "run", "start-prod"]