# Specifies the image of your engine
FROM node:18.12.1

# The working directory inside your container
WORKDIR /app

COPY package.json /app

# Copy the rest of the app to the working directory
COPY . /app

# This will install those dependencies
RUN npm install

# Run the container
CMD ["npm", "start"]

EXPOSE 8000
