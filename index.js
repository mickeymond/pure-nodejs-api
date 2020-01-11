const appServer = require('./lib/index');
const { getAllEITs, addEIT, getEIT, updateEIT, deleteEIT } = require('./src/controllers');

const app = appServer();

app.get('/', getAllEITs);

app.post('/', addEIT);

app.get('/:id', getEIT);

app.put('/:id', updateEIT);

app.delete('/:id', deleteEIT);

app.listen(3000, () => {
  console.log('Server started on port 3000');
})