# Stage 1: Build the application
FROM node:16 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Stage 2: Create a minimal production image
FROM node:16-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy only the built application and dependencies from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Install PM2 globally
RUN npm install -g pm2

# Expose the application port
EXPOSE 3001

# Run the application using PM2
CMD ["pm2-runtime", "index.js"]
