# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run your application
CMD ["node", "server.js"]
