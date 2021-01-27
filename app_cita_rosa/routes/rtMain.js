const express = require('express')
const rtMain = express.Router()

//RUTA PANTALLA INICIO
rtMain.get('/', (req, res) => {
  res.render('home')

})


module.exports = rtMain
