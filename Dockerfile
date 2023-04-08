FROM node:18.14-alpine as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm ci
COPY ./public ./public
COPY tailwind.config.cjs postcss.config.cjs vite.config.ts tsconfig.json tsconfig.node.json index.html ./
COPY ./src ./src
ARG VITE_GAPI_CLIENTID
ARG VITE_SERVER_DOMAIN
RUN npm run build

FROM nginx:1.23.3-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html