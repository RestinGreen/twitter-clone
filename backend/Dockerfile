FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install ts-node globally for development
RUN npm install -g ts-node nodemon

# Expose the port
EXPOSE 3001

# Start the application in development mode
CMD ["npm", "run", "dev"]
