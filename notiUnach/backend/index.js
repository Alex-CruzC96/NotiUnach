const express=require('express');
const cors=require('cors');
const app=express();
// const sql=require('mysql');
const db=require('./lib/db');

// require('dotenv').config();

// const db=sql.createConnection({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
//     port:process.env.DB_PORT    
// });

const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/signup',require('./routes/signup'));
app.use('/api/login',require('./routes/login'));
app.use('/api/signout',require('./routes/signout'));

app.get('/',(req,res)=>{
    res.send({status:200});
});
app.listen(port, () => {
    console.log('Server is running without problems!! port: ' + port);
});

// db.connect((err) => {
//     if (err) {
//         console.error('Error en la conexión con la base de datos:', err);
//         process.exit(1); // Salir del proceso si hay un error en la conexión
//     } else {
//         console.log('Conexión exitosa a la DB!!!');

//         // Iniciar el servidor solo si la conexión es exitosa
//         app.listen(port, () => {
//             console.log('Server is running without problems!! port: ' + port);
//         });
//     }
// });