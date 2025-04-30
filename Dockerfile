# Build stage
FROM node:23-slim AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN apt-get update -y && apt-get install -y openssl
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:23-slim AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expose the port
EXPOSE ${PORT}

# Start the application
CMD ["node", "dist/server/entry.mjs"]