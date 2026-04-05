# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Build for production
RUN npm run build


# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy build files from Stage 1
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (ensure it matches listen 80 in nginx.conf)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
