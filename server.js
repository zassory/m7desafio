const db = require("./app/models");
const userController = require("./app/controllers/user.controller");
const bootcampController = require("./app/controllers/bootcamp.controller");

const run = async() => {
    const user1 = await userController.createUser({
        firstName: "Nicolas Vladimir",
        lastName: "Caceres Latorre",
        email: "nicolas.programador@gmail.com"
    });

    const bootcamp1 = await bootcampController.createBootcamp({
        title: "Javascript 01",
        cue: 1,
        descripcion: "Curso desde cero en Js para FrontEnd y Backend"
    });

}

db.sequelize.sync({
    force: true,
}).then( ()=> {
    console.log('Eliminando y resincronizando la base de datos.');
    run();
})