# 1단계: 빌드 환경 설정
FROM node:16 as build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 /app으로 복사
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install @reduxjs/toolkit --force

# 프로젝트 파일을 작업 디렉토리로 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# 2단계: 서버 환경 설정
FROM nginx:stable-alpine

# 빌드된 애플리케이션을 nginx 서버로 복사
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx의 기본 설정을 사용자 정의 설정으로 대체 (선택 사항)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3001 포트 열기
EXPOSE 3000

# nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]
