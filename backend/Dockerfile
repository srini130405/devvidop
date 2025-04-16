# Step 1: Use an official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port (5000 in this case)
EXPOSE 5000

# Step 7: Start the server
CMD ["node", "server.js"]
