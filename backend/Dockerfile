FROM node:22-alpine

WORKDIR /app

# Copy shared folder first
COPY shared ./shared

# Copy backend package files
COPY backend ./backend

# Install dependencies
WORKDIR /app/backend
RUN npm install

# Install ts-node globally for development
RUN npm install -g ts-node nodemon

# Set working directory to backend for running the app
WORKDIR /app/backend

# Expose the port
EXPOSE 3001

# Start the application in development mode
CMD ["npm", "run", "dev"]
