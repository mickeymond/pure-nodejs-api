process.env.PORT = process.env.PORT || 3000;
const appServer = require('../lib');
const { getEITs, addEIT, getEIT, updateEIT, deleteEIT, ping } = require('./controllers');

// Starting the App Server
const app = appServer();

// Pinging to test the Server
app.get('/ping', ping);

// Setup for Users

// Setup for EITs
app.get('/eits', getEITs);

app.post('/eits', addEIT);

app.get('/eits/:id', getEIT);

app.put('/eits/:id', updateEIT); 

app.delete('/eits/:id', deleteEIT);

// Listenning to PORT
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});