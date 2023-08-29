const {
    users,
    bootcamps
} = require("../models");
const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createUser = (user) => {
    return User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }).then(user => {
        console.log(`>> Creado el usuario: ${JSON.stringify(user, null, 4)}`);
        return user;
    })
    .catch(err => {
        console.log(`>> Error al crear el curso: ${err.message}`);
    });
}