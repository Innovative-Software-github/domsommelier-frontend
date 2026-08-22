# Клиентский сайт (Next.js) — standalone-сборка для продакшена.
# BROWSER_BACKEND_SERVER нужен именно на этапе сборки: next.config.ts
# вычисляет destination для rewrites() при загрузке конфига, а для
# output: 'standalone' это происходит во время `next build` и записывается
# в .next/routes-manifest.json — рантайм-переменная окружения контейнера
# на уже собранный манифест не влияет (проверено на практике: без ARG
# здесь rewrites() зашивал дефолтный хост из next.config.ts намертво).

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
ARG BROWSER_BACKEND_SERVER
ENV BROWSER_BACKEND_SERVER=$BROWSER_BACKEND_SERVER
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
