FROM node:20

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

COPY ./backend/dist ./dist

EXPOSE 3000
CMD ["node", "./dist/app.js"]
