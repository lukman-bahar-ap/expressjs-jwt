# Dockerfile
# Base image
FROM node:14 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json .
COPY ./package-lock.json .

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Production image
FROM nginx:latest

# Copy Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

#RUN rm /etc/nginx/sites-enabled/default
COPY nginx/nodejs.com /etc/nginx/sites-available/nodejs.com
RUN ln -s /etc/nginx/sites-available/nodejs.com /etc/nginx/sites-enabled/nodejs.com

# Copy built application from the build image
COPY --from=build /app /var/www/html


EXPOSE 8080 8443 3000

# Start the application
#RUN npm run start-prod

# Start Nginx
CMD ["npm", "run", "start-prod", "nginx", "-g", "daemon off;"]
