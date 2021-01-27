const express = require('express')
const rtCitas = express.Router('./rtCitas')
const flatpickr = require("flatpickr")
const Spanish = require("flatpickr/dist/l10n/es.js").default.es;
const daoCitas = require('../dao/daoCitas')
const fs = require('fs')
const Cita = require('../models/Cita')


//MUESTRO VISTA FECHA 
rtCitas.get('/fecha', (req, res) => {
    res.render('fecha')
})
//MUESTRO VISTA DATOS 
rtCitas.get('/datos', (req, res) => {
    res.render('datos')
})
//MUESTRO VISTA CONFIRMAR 
rtCitas.get('/confirmar', (req, res) => {
    res.render('confirmar')
})

//RECIBO DATOS CITA LOCAL STORAGE Y LOS GUARDO EN EL FICHERO CITAS
rtCitas.post('/datosCita', (req, res) => {
    let cita = new Cita(req.body)
    let errores = cita.validar()
    if (errores.length == 0) {
        daoCitas.save(cita)
            .then(cita =>
                res.json({ cita: cita })
            )
    } else {
        res.json({ errores: errores })
    }
})

//MUESTRO HORAS
rtCitas.post('/consultarHours', (req, res) => {
    let dayConsult = req.body.dayConsult + 3600000
    let dateSearch = converteDate(new Date(dayConsult))
    let fechaColocada = dateSearch.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1')
    daoCitas.getHoursAvailable(fechaColocada)
        .then(hoursAvailable => {
            res.json({ hours: hoursAvailable })
        })
        .catch(err => console.log(`Error al intentar devolver horarios libres: linea 50, rtCitas: ${err}`))

    function converteDate(dayConsult) {
        month = '' + (dayConsult.getMonth() + 1)
        day = '' + dayConsult.getDate()
        year = dayConsult.getFullYear()
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        let dayConsultConverte = `${year}-${month}-${day}`
        return dayConsultConverte
    }
})


//MUESTRO VISTA EDITAR
rtCitas.get('/editar', (req, res) => {
    res.render('editar')
})

///RECUPERO CITA POR ID
rtCitas.post('/procesar', (req, res) => {
    let id = (req.body.id)
    daoCitas.getCitaId(id)
        .then(cita =>
            res.json({ cita: cita })
        )

})
//MUESTRO VISTA CITA EDITADA
rtCitas.get('/nuevacita', (req, res) => {
    res.render('nuevacita')
})

//EDITO CITA
rtCitas.post('/cambiar', (req, res) => {
    let citaNueva = (req.body)
    console.log(citaNueva)
    daoCitas.editCita(citaNueva)
        .then(citaNueva =>
            res.render('nuevacita', { citaNueva: citaNueva })
        )

})

//MUESTRO VISTA ELIMINAR
rtCitas.get('/eliminar', (req, res) => {
    res.render('eliminar')
})

//MUESTRO VISTA CITA ELIMINADA:
rtCitas.get('/citaeliminada', (req, res) => {
    res.render('citaeliminada')
})

//ELIMINO CITA:
rtCitas.post('/eliminar', (req, res) => {
    let citaEliminar = (req.body)
    daoCitas.cancelCita(citaEliminar)
        .then(citaEliminar =>
            res.render('citaeliminada', { citaEliminar: citaEliminar })
        )

})






module.exports = rtCitas


