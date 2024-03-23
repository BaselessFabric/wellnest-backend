# ---- Base Node ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci

# ---- Copy Files ----
FROM dependencies AS release
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]