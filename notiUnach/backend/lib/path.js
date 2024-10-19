const path = require('path');
const fs = require('fs');

// Definir la ruta correcta para el almacenamiento de las imágenes
const storagePath = path.resolve(__dirname, '../localstorage/profilePictures/');
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

module.exports = storagePath;
