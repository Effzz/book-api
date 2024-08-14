# Use a Node.js base image
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --preserveSymlinks

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]