FROM node:18-alpine as build-stage
WORKDIR /usr/src/app

ENV NODE_ENV=development
ENV PYTHONUNBUFFERED=1

COPY . .

RUN yarn install --frozen-lockfile \
    && yarn build:prod



FROM scratch AS export-stage
COPY --from=build-stage /usr/src/app/dist /
