const fs = require('fs')
const daoCitas = {}

//GUARDAR CITAS:
daoCitas.save = function save(cita) {
    let citas = []
    return new Promise((resolved, reject) => {
        fs.readFile('./dao/citas.json', 'utf8', (err, data) => {
            if (err) reject(err)
            citas = JSON.parse(data)
            citas.push(cita)
            fs.writeFile('./dao/citas.json', JSON.stringify(citas), (err) => {
                if (err) reject(err)
            })
            resolved(cita)
        })
    })
}  

 
//CONSULTA DE FECHAS:
daoCitas.getHoursAvailable = function getHoursAvailable(fechaColocada){
    let workday=["10:00","11:00","12:00","13:00","14:00", "16:00", "17:00", "18:00","19:00" ]
    let removed=[]
    return new Promise((resolved,reject)=>{
        fs.readFile('./dao/citas.json', 'utf8', (err, data) => {
            if (err) reject(err)
            citas = JSON.parse(data)
            let day=citas.filter(e=>e.fecha==fechaColocada)
            if (day.length > 0){
                    day.forEach((cita)=>{
                        workday.forEach((hour,j)=>{                            
                            if (hour == cita.hora) removed=workday.splice(j, 1)
                        })
                    })
                   resolved(workday)
                }
                else if (day.length == 0){
                        resolved(workday)
                }
                else reject('Error con la promesa')
        })
    })
}

//BUSCAR CITA POR ID:
daoCitas.getCitaId = function getCitaId(id) {
    return new Promise((resolved, reject) => {
        fs.readFile('./dao/citas.json', 'utf8', (err, data) => {
            if (err) reject(err)
            citas = JSON.parse(data)
            let citaRec=citas.find(cita => cita.id === id)
            resolved(citaRec)

            reject("error")
        })
    })
}  

//EDITAR CITA:
  daoCitas.editCita = function editCita(citaNueva){
    let citaACambiar
    this.getCitaId(citaNueva.id)
      .then(citaEncontrada=>{
        citaACambiar=citaEncontrada
        citaACambiar.fecha=citaNueva.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1')
        citaACambiar.hora=citaNueva.hora
      })

    return new Promise((resolved,reject)=>{ 
        fs.readFile('./dao/citas.json', 'utf8', (err, data) => {
            if (err) reject(err)
            citas = JSON.parse(data)
            citas.splice(citas.indexOf(cita=>cita.id==citaNueva.id), 1, citaACambiar)
            fs.writeFile('./dao/citas.json', JSON.stringify(citas), (err) => {
                if (err) reject(err)
            })
            resolved(citaACambiar)
        })   
    })        
} 
 
//ELIMINAR CITA:
   daoCitas.cancelCita= function cancelCita (citaEliminar){
    let citaAEliminar
     this.getCitaId(citaEliminar.id)
       .then(citaBorrar=>citaAEliminar=citaBorrar)
  
     return new Promise ((resolved,reject)=>{ 
        fs.readFile('./dao/citas.json', 'utf8', (err, data) => {
            if (err) reject(err)
            citas = JSON.parse(data)
            indice=citas.findIndex(meme => `${meme.id}`==citaEliminar.id)
            citas.splice(indice,1)
            fs.writeFile('./dao/citas.json', JSON.stringify(citas), (err) => {
                if (err) reject(err)
            })
            resolved(citaAEliminar)
        })   
    })        
}  

    





module.exports = daoCitas



