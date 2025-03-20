# 빌드
FROM node:20.18.1-alpine AS builder
WORKDIR /app
RUN npm install yarn # version resolution
COPY package*.json .
RUN yarn install
COPY . .
RUN yarn generate

# 실행
FROM nginx:1.26-alpine
WORKDIR /app

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# 커스텀 Nginx 설정 적용
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

