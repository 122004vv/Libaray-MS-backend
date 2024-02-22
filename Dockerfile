# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose ports for your two Express apps
EXPOSE 8080
EXPOSE 8081

# Define the command to run your application
CMD ["node", "server.js"]
