import { Request, Response, NextFunction } from 'express';
import ApiServices from './services';

var express = require('express');
var app = express();

// CORS
var cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:8080',
}

// TODO : add to env file
const API_ENDPOINT_PORT = 9000;

// This enables the front end to access the API service
app.use(cors(corsOptions))

for (const [model, { services }] of Object.entries(ApiServices)) {
  for (const [serviceName, serviceFunction] of Object.entries(services)) {
      app.get(`/${model}/${serviceName}`, function (request: Request, response: Response, next: NextFunction) {
          serviceFunction(request, response, next);
      });
  }
}


app.listen(API_ENDPOINT_PORT, () => {
  console.log(`Server running on port ${API_ENDPOINT_PORT} with CORS enabled on localhost:8080`);
});
 