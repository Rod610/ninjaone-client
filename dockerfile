FROM node:22.1-alpine

# Set working directory
WORKDIR /usr/src/ninjaone-client

# Copy package.json and package-lock.json first for efficient caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the app
COPY . .

# Start the development server
CMD ["pnpm","run", "dev"]