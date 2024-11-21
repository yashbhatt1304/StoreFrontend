FROM node:23

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# providing env variables
ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]