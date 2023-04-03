FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /usr/src/app
# Copy app files
COPY . .
# ==== BUILD =====

RUN npm install -g serve 


# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV PORT=3001
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/todos
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3001
# Start the app
CMD [ "npx", "serve", "build" ]