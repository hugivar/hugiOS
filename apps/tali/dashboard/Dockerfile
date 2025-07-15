# To be run in the root of the turbo monorepo
# NOTE: It's highly recommended to use the new builder, Buildkit. https://docs.docker.com/build/buildkit/
## USAGE:
# Build:        DOCKER_DEFAULT_PLATFORM=linux/amd64 docker build . -f dashboard/Dockerfile -t dashboard:latest
# Run:          docker run -p 3000:3000 hugivar/dashboard
# Deploy:       docker push hugivar/dashboard:latest
# Clean build:
#    docker builder prune
#    docker build . -f dashboard/Dockerfile --target production -t dashboard:latest --no-cache

FROM node:18-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=dashboard --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN npm i -g pnpm
RUN pnpm fetch
RUN pnpm install -r --offline

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
RUN npx turbo run build --filter=dashboard...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/dashboard/next.config.js .
COPY --from=installer /app/dashboard/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/dashboard/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/dashboard/.next/static ./dashboard/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/dashboard/public ./dashboard/public

EXPOSE 4000
ENV PORT 4000
ENV HOSTNAME localhost

CMD ["node", "dashboard/server.js"]