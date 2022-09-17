# Base image
FROM node:alpine

WORKDIR /app
# Install some dependencies
COPY app/package.json ./
RUN npm install
COPY app ./

# Default command
CMD ["npm", "start"]
