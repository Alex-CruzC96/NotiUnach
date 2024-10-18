const express=require('express');
const cors=require('cors');
const app=express();
const db=require('./lib/db');

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
