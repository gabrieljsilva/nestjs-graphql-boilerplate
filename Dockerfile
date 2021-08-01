FROM node:14.17.0-alpine
WORKDIR /source

COPY . .

CMD ["./docker/commands/init.sh"]