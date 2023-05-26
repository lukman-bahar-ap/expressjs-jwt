# Dockerfile
# Production image
FROM nginx:latest

# Copy Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copy built application from the build image
COPY --from=build /app/dist /var/share/nginx/html


EXPOSE 8080 8443 3000

# Start the application
#RUN npm run start-prod

# Start Nginx
CMD ["npm", "run", "start-prod", "nginx", "-g", "daemon off;"]
