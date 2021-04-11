require('dotenv').config();

const express = require('express')
const app = express(); 
const port = process.env.PORT;
 
app.get('/', function (req, res) {
  res.send('Helld   o World')
})
 
app.listen(port, () => {
    console.log('Ejecutando en el puerto', port);
})