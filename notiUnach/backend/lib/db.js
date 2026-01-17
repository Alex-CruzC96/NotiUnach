const { Pool } = require('pg');

const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "notiunach",
  port:5432,
});

db.connect()
  .then(client => {
    console.log("Conexión exitosa a la base de datos");
    client.release();
  })
  .catch(err => {
    console.error("Error en la conexión a PostgreSQL", err);
    process.exit(1);
  });

module.exports = db;