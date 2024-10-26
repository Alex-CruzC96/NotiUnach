const path = require('path');
const fs = require('fs');

const imagePath = path.resolve(__dirname, '../localstorage/images/');
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

module.exports = imagePath;
