// Dependencies
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// DataService Module to export
const dataService = {};

dataService.getEITs = callback => {
  readAndParseEits((err, data) => {
    if (err) {
      return callback(false, err);
    }

    callback(false, false, data);
  });
}

dataService.addEIT = ({ firstName, lastName, age, country }, callback) => {
  readAndParseEits((err, data) => {
    if (err) {
      return callback(false, err);
    }

    const id = generateUuid();

    const newEit = { id, firstName, lastName, age, country };
  
    const newEits = [...data, newEit];
  
    fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(newEits), (err) => {
      if (err) {
        return callback(false, err);
      }
  
      callback(false, false, newEit);
    });
  });
}

dataService.getEIT = (id, callback) => {
  readAndParseEits((err, data) => {
    if (err) {
      return callback(false, err);
    }

    const eit = data.find(eit => eit.id === id);

    if (!eit) {
      return callback(404, { message: `EIT with ID ${id} Not Found` });
    }

    callback(false, false, eit);
  });
}

dataService.updateEIT = (id, { firstName, lastName, age, country }, callback) => {
  readAndParseEits((err, data) => {
    if (err) {
      return callback(false, err);
    }

    const eit = data.find(eit => eit.id === id);
  
    if (!eit) {
      return callback(404, { message: `EIT with ID ${id} Not Found` });
    }

    const restOfEits = data.filter(eit => eit.id !== id);
  
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

    const updatedEits = [...restOfEits, eit];

    fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(updatedEits), (err) => {
      if (err) {
        return callback(false, err);
      }
  
      callback(false, false, eit);
    });
  });
}

dataService.deleteEit = (id, callback) => {
  readAndParseEits((err, data) => {
    if (err) {
      return callback(false, err);
    }

    const eit = data.find(eit => eit.id === id);

    if (!eit) {
      return callback(404, { message: `EIT with ID ${id} Not Found` });
    }

    const restOfEits = data.filter(eit => eit.id !== id);

    fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(restOfEits), (err) => {
      if (err) {
        return callback(false, err);
      }
  
      callback(false, false, { message: `EIT with ID ${id} Deleted Successfully` });
    });
  });
}

// Reusable Functions
const readAndParseEits = callback => {
  fs.readFile(path.resolve(__dirname, 'data.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      return callback(err);
    }

    let jsonData;

    try {
      jsonData = JSON.parse(data);
    } catch (error) {
      jsonData = [];
    }
    
    callback(false, jsonData);
  });
}

const generateUuid = () => {
  const secret = 'aasdjakdbajsavjxvasgtcvascacscsacasdsavsav';
  const data = Date.now().toString();
  return crypto.createHash('sha256').update(data + secret).digest('hex').substr(0, 24);
}

// Module to exports
module.exports = {
  dataService,
  generateUuid
};