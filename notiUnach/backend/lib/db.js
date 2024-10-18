const sql=require('mysql');
require('dotenv').config();

const db=sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err)=>{
    if (err) {
        console.error('Error en la conexión con la base de datos:', err);
        process.exit(1); // Salir del proceso si hay un error en la conexión
      } else {
        console.log('Conexión exitosa a la DB, felicidades!!!');
      }
});

module.exports=db;