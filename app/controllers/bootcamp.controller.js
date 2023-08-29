const {
    users,
    bootcamps
} = require("../models");
const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createBootcamp = (bootcamp) => {
    return Bootcamp.create({
        title: bootcamp.title,
        cue: bootcamp.cue,
        descripcion: bootcamp.descripcion,
    }).then( bootcamp => {
        console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`);
        return bootcamp;
    })
    .catch(err => {
        console.log(`>> Error al crear el bootcamp: ${err.message}`);
    });
}