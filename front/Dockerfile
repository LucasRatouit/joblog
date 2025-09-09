# FROM node:23.11.0 AS builder
# WORKDIR /app
# COPY . .
# RUN npm i && npm run build

# FROM node:23.11.0 AS dev
# WORKDIR /app
# COPY --from=builder /app ./
# RUN npm i
# EXPOSE 5173
# CMD ["npm", "run", "dev"]

FROM node:23.11.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]
