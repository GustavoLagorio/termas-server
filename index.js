const express =  require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico

app.use( express.static('public') );

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/bungalows', require('./routes/bungalows'));
//Autenticacion//crear, login, renew
//CRUD: Eventos

//Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})