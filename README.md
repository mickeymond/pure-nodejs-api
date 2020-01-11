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

4. The ```/README.md``` folder

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
  "country": String|Required,
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
  "country": String|Optional,
}

Response: Updated EIT
```

5. Deleted an EIT => DELETE /id

```
Endpoint: http://localhost:3000/id

Request: None

Response: Deleted Success
```