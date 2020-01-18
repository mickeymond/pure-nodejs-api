/*
* API Tests
*
*/
process.env.PORT = 4000;

// Dependencies
require('../src/app');
const http = require('http');
const assert = require('assert');

const api = {};

const requestClient = (path, callback) => {
  // Configure the request details
  const req = {
    protocol: 'http:',
    host: 'localhost',
    port: process.env.PORT,
    method: 'GET',
    path,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Send the request
  http.request(req, (res) => {
    console.log(res);
  }).end();
}

requestClient('/', () => {});


console.log(process.env.PORT);