const {
    users,
    bootcamps
} = require("../models");
const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;
const UserBootCamp = db.user_bootcamp;

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

exports.addUserBoomcamp = async(userId, bootcampId) => {
    try{
        const user = await User.findByPk(userId);
        const bootcamp = await Bootcamp.findByPk(bootcampId);

        if(!user || !bootcamp){
            console.log('Usuario o bootcamp no encontrado');
        }

        await UserBootCamp.create({
            userId,
            bootcampId
        });

        return;
    } catch(err){
        console.error("Error: ", err)
    }
}

exports.getBootcampForUser = async (userId) => { 
    try {
        // Buscar el bootcamp
        const user = await User.findByPk(userId, {
            include: [{
                model: Bootcamp,
                as: 'bootcamps',
                through: {
                    model: UserBootCamp,
                    attributes: []
                } 
            }]
        });

        if (!user) {
            console.log("User no encontrado");
        }

        const bootcamp = user.dataValues.bootcamps;
        console.log("------------------------",bootcamp);
        return bootcamp;
    } catch (err) {
        console.error("Error en la consulta:", err);
        throw err
    }
};

exports.findAll = () => {
    return Bootcamp.findAll({
        include: [{
            model: User,
            as: "users",
            attributes: ["firstname","lastname","email"],
            through: "userbootcamp"
        }]
    }).then(bootcamp => (bootcamp))
      .catch(err => console.log('Error buscando al bootcamp', err.message));
}

exports.updateBootcamp = async (bootcampId,title) => {
    const id = parseInt(bootcampId);

    try {
        // Buscar el usuario que deseas actualizar
        const bootcamp = await Bootcamp.findByPk(id);

        if (!bootcamp) {
            console.log("Bootcamp no encontrado");
            return null;
        }
        
        bootcamp.title = title;
        bootcamp.cue = bootcamp.cue;
        bootcamp.descripcion = bootcamp.descripcion;
        
        await bootcamp.save();

        console.log("Bootcamp actualizado correctamente");

        return bootcamp;
    } catch (err) {
        console.error("Error al actualizar un bootcamp", err);
        throw err;
    }
};

exports.deleteBootcamp = async (id) => {
    const idBootcamp = parseInt(id);

    try {
        // Buscar el bootcamp que deseas eliminar
        const bootcamp = await Bootcamp.findByPk(idBootcamp);

        if (!bootcamp) {
            console.log("Bootcamp eliiminado satisfactoriamente");
        }

        // Eliminar el bootcamp
        await bootcamp.destroy();
        console.log("Bootcamp eliminado correctamente");
        return bootcamp;
        
    } catch (err) {
        console.error("Error al eliminar un bootcamp:", err);
        throw err;
    }
};





