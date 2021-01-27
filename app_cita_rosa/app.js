 //instalo servidor
  const express = require('express')
  const app = express()
 
//enrutadores
  const rtMain= require('./routes/rtMain')
  const rtCitas= require('./routes/rtCitas')

//módulos
  const flatpickr = require("flatpickr")
  const fs=require('fs')

//motor de plantillas handlebars
  var exphbs  = require('express-handlebars')
  app.engine('.hbs', exphbs({
    extname: '.hbs'
  }))
  app.set('view engine', 'hbs')

  //middlewares
  app.use(express.urlencoded({extended:true}))
  app.use(express.static(__dirname + '/public'))
  app.use(express.json())
  app.use('/',rtMain)
  app.use('/citas',rtCitas)
  


    


  app.listen(3003,console.log("Servidor express en puerto 3003"))

  

