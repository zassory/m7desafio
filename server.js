const db = require("./app/models");
const userController = require("./app/controllers/user.controller");

const run = async() => {
    const user1 = await userController.createUser({
        firstName: "Nicolas Vladimir",
        lastName: "Caceres Latorre",
        email: "nicolas.programador@gmail.com"
    });
}

db.sequelize.sync({
    force: true,
}).then( ()=> {
    console.log('Eliminando y resincronizando la base de datos.');
    run();
})