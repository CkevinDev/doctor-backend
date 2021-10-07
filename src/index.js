require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { dbconnection } = require('./database/database')

const app = express();

app.use(cors());
app.use(express.json())

dbconnection();


//directorio publico
app.use(express.static('public'))


//rutas
app.use('/api/usuarios',require('./routes/usuario'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/upload',require('./routes/upload'));
app.use('/api/login',require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log("conectado al puerto:", process.env.PORT);
})