const fs = require('fs');
const path = require('path');

// Get All EITs Controller
exports.getAllEITs = (req, res) => {
  let parsedEits = readAndParseEits();

  res.json(parsedEits);
}


// Add an EIT Controller
exports.addEIT = (req, res) => {
  const { firstName, lastName, age, country } = req.body;

  if (!firstName) {
    return res.status(400).json({
      reason: "firstName not found in request body"
    });
  }

  if (!lastName) {
    return res.status(400).json({
      reason: "lastName not found in request body"
    });
  }

  if (!age) {
    return res.status(400).json({
      reason: "age not found in request body"
    });
  }

  if (!country) {
    return res.status(400).json({
      reason: "country not found in request body"
    });
  }

  let parsedEits = readAndParseEits();

  const nextId = parsedEits.length + 1;

  const newEit = { id: nextId, firstName, lastName, age, country };

  const newEits = [...parsedEits, newEit];

  fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(newEits));

  res.status(201).json(newEit);
}


// Get a Single EIT
exports.getEIT = (req, res) => {
  let parsedEits = readAndParseEits();

  const eit = parsedEits.find(eit => eit.id === +req.params.id);

  if (!eit) {
    return res.status(404).json({
      reason: `EIT with ID ${req.params.id} Not Found`
    })
  }

  res.json(eit);
}

exports.updateEIT = (req, res) => {
  let parsedEits = readAndParseEits();
  
  const eit = parsedEits.find(eit => eit.id === +req.params.id);
  
  if (!eit) {
    return res.status(404).json({
      reason: `EIT with ID ${req.params.id} Not Found`
    })
  }

  const restOfEits = parsedEits.filter(eit => eit.id !== +req.params.id);
  
  const { firstName, lastName, age, country } = req.body;

  if (firstName) {
    eit.firstName = firstName;
  }

  if (lastName) {
    eit.lastName = lastName;
  }

  if (age) {
    eit.age = age;
  }

  if (country) {
    eit.country = country;
  }

  const newEits = [...restOfEits, eit];

  fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(newEits));

  res.json(eit);
}

exports.deleteEIT = (req, res) => {
  let parsedEits = readAndParseEits();

  const eit = parsedEits.find(eit => eit.id === +req.params.id);

  if (!eit) {
    return res.status(404).json({
      reason: `EIT with ID ${req.params.id} Not Found`
    })
  }

  const restOfEits = parsedEits.filter(eit => eit.id !== +req.params.id);

  fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(restOfEits));

  res.json({
    reason: `EIT with ID ${req.params.id} Deleted`
  });
}

const readAndParseEits = () => {
  let parsedEits;

  try {
    const eits = fs.readFileSync(path.resolve(__dirname, 'data.json'), { encoding: 'utf8' });
    parsedEits = JSON.parse(eits);
  } catch (error) {
    parsedEits = [];
  }

  return parsedEits;
}