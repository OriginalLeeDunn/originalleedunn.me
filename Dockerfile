# Use an official Node runtime as the base image
FROM node:18-alpine 
# Using alpine for smaller image size

# Set the working directory in the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci 
# Using ci instead of install for more reliable builds

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lighter server package
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["serve", "-s", "dist", "-l", "3000"]