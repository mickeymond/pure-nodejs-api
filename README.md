# Pure NodeJS API: EITs Management App

It a pure nodejs api using an express-like library a hacked out

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

## Testing All Endpoints

1. Get all EITS => GET /

```
Endpoint: http://localhost:3000

Request: None

Response: Array of EITS
```

2. Add an EIT => POST /

```
Endpoint: http://localhost:3000

Request: {
  "firstName": String|Required,
  "lastName": String|Required,
  "age": Number|Required,
  "firstName": String|Required,
}

Response: Newly Added EIT
```

3. Get an EIT => GET /id

```
Endpoint: http://localhost:3000/id

Request: None

Response: EIT with the provided id
```

4. Update an EIT => PUT /id

```
Endpoint: http://localhost:3000/id

Request: {
  "firstName": String|Optional,
  "lastName": String|Optional,
  "age": Number|Optional,
  "firstName": String|Optional,
}

Response: Updated EIT
```

5. Deleted an EIT => DELETE /id

```
Endpoint: http://localhost:3000/id

Request: None

Response: Deleted Success
```