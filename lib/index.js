const { createServer, STATUS_CODES } = require('http');
const { StringDecoder } = require('string_decoder');
const url = require('url');

module.exports = () => {
  // Array to register routes and handlers
  const routesHandlers = [];

  // Route not found Handler
  const notFoundHandler = (req, res) => {
    res.status(404).json({
      reason: `Cannot ${req.method} to ${req.url}`
    });
  }

  // Server Creation
  const server = createServer((req, res) => {
    // A helper to prepare the response before sending
    res.json = data => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        code: res.statusCode,
        message: STATUS_CODES[`${res.statusCode}`],
        data
      }));
    }

    // A helper to dynamically manage status codes and messages
    res.status = code => {
      res.statusCode = code;
      res.statusMessage = STATUS_CODES[`${code}`];
      return res;
    }

    // Here is where reading of the request body happens
    let buffer = '';
    const decoder = new StringDecoder('utf8');
    req.on('data', (data) => {
      buffer += decoder.write(data);
    });

    // Getting the full path of the request
    const path = req.url;

    // Parisng and add query strings to request
    req.query = url.parse(path, true).query;

    // Generating a RegExp to dynamically match registered routes
    const pathParams = path.split('?')[0].split('/').filter(x => x !== '');
    const method = req.method.toLowerCase();
    let regexString;
    if (pathParams.length > 0) {
      const str = pathParams.reduce((acc, x) => {
        acc += '\/[A-Za-z0-9_]{1,}';
        return acc;
      }, '');
      regexString = `^(${method}${str})$`;
    } else {
      regexString = `^(${method}\/)$`
    }
    const regex = new RegExp(regexString);
  
    // Handling the Request end event
    req.on('end', () => {
      // Forwarding the body with the request
      req.body = buffer ? JSON.parse(buffer) : {};

      // Using RegExp to retrieve the route handler
      const handlerObject = routesHandlers.find(obj => regex.test(obj.id));
      
      // If handler exists
      if (handlerObject) {
        // Filter path params from route path
        const params = pathParams.reduce((acc, cur, index) => {
          if (cur === handlerObject.pathParams[index]) {
            return acc;
          }

          acc[handlerObject.pathParams[index]] = cur;
          return acc;
        }, {});

        // Set request params
        req.params = params;

        // Handle the request gracefully
        handlerObject.handler(req, res);
      } else {
        // Set request params to empty object
        req.params = {};

        // Use the the not found handler for the request
        notFoundHandler(req, res);
      }
    });
  });

  // Public method to register HTTP GET requests
  const get = (path, handler) => {
    const formatedPath = path.replace(new RegExp(':', 'g'), '');
    const pathParams = path.replace(new RegExp(':', 'g'), '').split('/').filter(x => x !== '');
    routesHandlers.push({ id: `get${formatedPath}`, pathParams, handler });
  }

  // Public method to register HTTP POST requests
  const post = (path, handler) => {
    const formatedPath = path.replace(new RegExp(':', 'g'), '');
    const pathParams = path.replace(new RegExp(':', 'g'), '').split('/').filter(x => x !== '');
    routesHandlers.push({ id: `post${formatedPath}`, pathParams, handler });
  }

  // Public method to register HTTP PUT requests
  const put = (path, handler) => {
    const formatedPath = path.replace(new RegExp(':', 'g'), '');
    const pathParams = path.replace(new RegExp(':', 'g'), '').split('/').filter(x => x !== '');
    routesHandlers.push({ id: `put${formatedPath}`, pathParams, handler });
  }

  // Public method to register HTTP DELETE requests
  const destroy = (path, handler) => {
    const formatedPath = path.replace(new RegExp(':', 'g'), '');
    const pathParams = path.replace(new RegExp(':', 'g'), '').split('/').filter(x => x !== '');
    routesHandlers.push({ id: `delete${formatedPath}`, pathParams, handler });
  }
  
  // Public implementation of server.listen function
  const listen = (port, cb) => {
    server.listen(port, () => {
      cb();
    });
  }

  return {
    listen,
    get,
    post,
    put,
    delete: destroy
  };
}