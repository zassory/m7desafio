const db = require("./app/models");
const userController = require("./app/controllers/user.controller");
const bootcampController = require("./app/controllers/bootcamp.controller");

const run = async() => {
    const user1 = await userController.createUser({
        firstname: "Nicolas Vladimir",
        lastname: "Caceres Latorre",
        email: "nicolas.programador@gmail.com"
    });

    const bootcamp1 = await bootcampController.createBootcamp({
        title: "Javascript 01",
        cue: 1,
        descripcion: "Curso desde cero en Js para FrontEnd y Backend"
    });

    await bootcampController.addUserBoomcamp(user1.id, bootcamp1.id);

    await userController.getUsersForBootcamp(bootcamp1.id);

    const users_boot = await userController.findAll();
    console.log(`La respuesta es: ----- ${JSON.stringify(users_boot,null,2)}`);

    await userController.updateUser(1,'Zenaku');

    await userController.deleteUser(1);

    await bootcampController.getBootcampForUser(user1.id);

    await bootcampController.updateBootcamp(bootcamp1.id,'React Js');

    await bootcampController.deleteBootcamp(bootcamp1.id);
}

db.sequelize.sync({
    force: true,
}).then( ()=> {
    console.log('Eliminando y resincronizando la base de datos.');
    run();
})