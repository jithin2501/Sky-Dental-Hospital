# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app source code (except node_modules)
COPY . .

# Expose port (ensure it matches process.env.PORT in server.js)
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
