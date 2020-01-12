const appServer = require('./lib');
const PORT = process.env.PORT || 3000;
const { getAllEITs, addEIT, getEIT, updateEIT, deleteEIT } = require('./src/controllers');

const app = appServer();

app.get('/', getAllEITs);

app.post('/', addEIT);

app.get('/:id', getEIT);

app.put('/:id', updateEIT);

app.delete('/:id', deleteEIT);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})