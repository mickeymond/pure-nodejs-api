// Dependencies
const crypto = require('crypto');
const { dataService } = require('./helpers');

// Get EITs Controller
exports.getEITs = (req, res) => {
  dataService.getEITs((code, err, data) => {
    if (err) {
      if (code) {
        return res.status(code).json(err);
      }
      return res.status(500).json(err);
    }

    res.json(data);
  });
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

  dataService.addEIT(req.body, (code, err, data) => {
    if (err) {
      if (code) {
        return res.status(code).json(err);
      }
      return res.status(500).json(err);
    }

    res.status(201).json(data);
  });
}


// Get a Single EIT
exports.getEIT = (req, res) => {
  dataService.getEIT(req.params.id, (code, err, data) => {
    if (err) {
      if (code) {
        return res.status(code).json(err);
      }
      return res.status(500).json(err);
    }

    res.json(data);
  });
}

exports.updateEIT = (req, res) => {
  dataService.updateEIT(req.params.id, req.body, (code, err, data) => {
    if (err) {
      if (code) {
        return res.status(code).json(err);
      }
      return res.status(500).json(err);
    }

    res.json(data);
  });
}

exports.deleteEIT = (req, res) => {
  dataService.deleteEit(req.params.id, (code, err, data) => {
    if (err) {
      if (code) {
        return res.status(code).json(err);
      }
      return res.status(500).json(err);
    }

    res.json(data);
  })
}

exports.ping = (req, res) => {
  const secret = 'aasdjakdbajsavjxvasgtcvascacscsacasdsavsav';
  const data = Date.now().toString();
  const hash = crypto.createHash('sha256').update(data + secret).digest('hex').substr(0, 24);
  res.json({ hash });
}
