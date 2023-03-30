FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

ENV PORT=3001
ENV REACT_APP_BACKEND_URL=http://localhost:3000/

EXPOSE 3001

# npm start is the command to start the application in development mode
CMD ["npm", "start"]