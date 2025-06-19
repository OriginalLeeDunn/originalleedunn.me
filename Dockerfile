# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3001

# Set environment variables
ENV PORT=3001
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]