module.exports = class Cita {

    //constructor
    constructor(cita) {
        this.id = this.genId()
        this.fecha = cita.fecha
        this.hora=cita.hora
        this.nombre = cita.nombre
        this.apellidos = cita.apellidos
        this.email = cita.email
        this.telefono = cita.telefono
    }

    //CREO ID CITA
    genId() {
        let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789"
        let clave = ""
        for (let i = 0; i < 5; i++) clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        return clave
    }


   //VALIDAR EN SERVIDOR
     validar() {
        let errores = []
        if (this.nombre == "") errores.push({ mensaje: "El nombre no puede estar vacío" })
        if (this.apelidos == "") errores.push({ mensaje: "El apellido no puede estar vacío" })
        let regEmail = /^[\w]+@{1}[\w]+\.[a-z]{2,3}$/
        if (!regEmail.test(this.email)) errores.push({ mensaje: "El formato no es válido" })
        if (this.telefono[0] != "6") errores.push({ mensaje: "El teléfono tiene que empezar por 6" })
        return errores
    } 
}

    //codigoQr()




