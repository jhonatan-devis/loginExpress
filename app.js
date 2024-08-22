const express = require('express')
const app = express()
const port = 3000
// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')
var app = express()


// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'login',
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login',async (req, res) => { //req = request, peticion; res = response, respuesta
    const datos = req.querty;
    // A simple SELECT query
try {
    const [results, fields] = await connection.query(
      'SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?',
      [datos.usuario,datos.clave]
    );
    if (results.length >0){
        req.status(200).send('datos correctos')
    } else {
        res.status(401).send('datos incorrectos')
  
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
  
})
app.get('/validar', (req, res) => {
  res.send('validar')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})