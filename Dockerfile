FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY gateway/package.json ./gateway/package.json
COPY services/empleados/package.json ./services/empleados/package.json
COPY services/nomina/package.json ./services/nomina/package.json
COPY services/reclutamiento/package.json ./services/reclutamiento/package.json
ARG COMPONENT
RUN npm ci --omit=dev --workspace ${COMPONENT}
COPY shared ./shared
COPY ${COMPONENT}/src ./${COMPONENT}/src
ENV APP_ENTRY=${COMPONENT}/src/index.js
USER node
CMD ["sh", "-c", "exec node $APP_ENTRY"]
