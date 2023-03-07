FROM node:18.14-alpine as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm ci
COPY ./public ./public
COPY tailwind.config.js tsconfig.json ./
COPY ./src ./src
ARG REACT_APP_GAPI_CLIENTID
ARG REACT_APP_SERVER_DOMAIN
RUN npm run build

FROM nginx:1.23.3-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html