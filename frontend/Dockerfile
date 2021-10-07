FROM node:14.16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV production
RUN npm ci

FROM deps as build
COPY . .
RUN npm run build

FROM nginx:1.15 as prod

COPY --from=build /app/dist/ /usr/share/nginx/html

COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf