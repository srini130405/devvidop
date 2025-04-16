# Step 1: Use an official Node.js image as the base image
FROM node:16 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the React app with a static server
FROM nginx:alpine

# Step 8: Copy build folder from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port (default Nginx port is 80)
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
