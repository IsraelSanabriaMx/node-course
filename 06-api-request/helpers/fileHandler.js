const fs = require('fs');

const filePath = './db/places.json';

const saveData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

const readData = () => {
  if (!fs.existsSync) {
    return null;
  }

  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });

  return JSON.parse(data);
}

module.exports = {
  saveData,
  readData,
};