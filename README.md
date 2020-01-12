# Pure NodeJS API: EITs Management App

It's a pure nodejs api using an express-like library I hacked out

## Folders and Files

1. The ```/lib``` folder

```
The is the folder that holds the mini express-like library.
You can temper with it if you know what you are doing
```

2. The ```/src``` folder

```
The is the folder that holds your api files which will be imported into index.js
This is all yours
```

3. The ```index.js``` file

```
This is the file that starts your api.
This is all yours as well
```

4. The ```package.json``` file

```
All the package.json is doing right now is helping to deploy to services like heroku.
Not for managing dependencies
```

5. The ```README.md``` file

```
Contains clear documentation on how to go about things.
```

## Installation

1. Clone the repository

```
<https>: git clone https://github.com/mickeymond/pure-nodejs-api.git

<ssh>: git clone git@github.com:mickeymond/pure-nodejs-api.git
```

2. cd into the project directory

```
cd pure-nodejs-api
```

## Usage

1. Start the Server

```
node index.js
```

2. Use Postman or Browser to test

```
http://localhost:3000
```

## What can I do with it?
1. Start a NodeJS HTTP Server

```
const appServer = require('./lib');

const app = appServer();
```

2. Register Routes with Handlers [GET, POST, PUT, DELETE]

```
app.get('/', (req, res) => {
  // Business Logic goes here

  // Return some JSON response
  res.status(200).json({
    message: "I really like what I am seeing"
  });
});
```

## API

1. Application ```app```

```
app.listen(port<Number>, callback<Function>)

app.get(path<String>, handler<Function<req, res>>)

app.post(path<String>, handler<Function<req, res>>)

app.put(path<String>, handler<Function<req, res>>)

app.delete(path<String>, handler<Function<req, res>>)
```

2. Request ```req```

```
req.params

req.query

req.body
```

3. Response ```res```

```
res.json(response<Object>)

res.status(code<Number>)
```

## Testing All Endpoints

1. Get all EITS => GET /

```
Endpoint: http://localhost:3000 or https://pure-nodejs-api.herokuapp.com

Request: None

Response: Array of EITS
```

2. Add an EIT => POST /

```
Endpoint: http://localhost:3000 or https://pure-nodejs-api.herokuapp.com

Request: {
  "firstName": String|Required,
  "lastName": String|Required,
  "age": Number|Required,
  "country": String|Required,
}

Response: Newly Added EIT
```

3. Get an EIT => GET /id

```
Endpoint: http://localhost:3000/id or https://pure-nodejs-api.herokuapp.com/id

Request: None

Response: EIT with the provided id
```

4. Update an EIT => PUT /id

```
Endpoint: http://localhost:3000/id or https://pure-nodejs-api.herokuapp.com/id

Request: {
  "firstName": String|Optional,
  "lastName": String|Optional,
  "age": Number|Optional,
  "country": String|Optional,
}

Response: Updated EIT
```

5. Deleted an EIT => DELETE /id

```
Endpoint: http://localhost:3000/id or https://pure-nodejs-api.herokuapp.com/id

Request: None

Response: Deleted Success
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)