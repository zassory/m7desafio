const {
    users,
    bootcamps
} = require("../models");
const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;
const UserBootcamp = db.user_bootcamp;

exports.createUser = (user) => {
    return User.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
    }).then(user => {
        console.log(`>> Creado el usuario: ${JSON.stringify(user, null, 4)}`);
        return user;
    })
    .catch(err => {
        console.log(`>> Error al crear el curso: ${err.message}`);
    });
}

exports.getUsersForBootcamp = async (bootcampId) => {    
    try {
        // Buscar el bootcamp
        const bootcamp = await Bootcamp.findByPk(bootcampId, {
            include: [{
                model: User,
                as: 'users',
                through: {
                    model: UserBootcamp,                    
                    attributes: []
                } 
            }]
        });

        if (!bootcamp) {
            console.log("Bootcamp no encontrado.");
        }

        const users = bootcamp.users;
        console.log(users);
        return users;
        //const users = bootcamp.dataValues.users[0].dataValues;        
    } catch (error) {
        console.error("Error en la consulta:", error);
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

exports.updateUser = async (userId,firstname) => {
    const id = parseInt(userId);    

    try {
        // Buscar el usuario que deseas actualizar
        const user = await User.findByPk(id);

        if (!user) {
            console.log("Usuario no encontrado.");
            return null;
        }
        
        user.firstname = firstname;
        user.lastname = user.lastname;
        user.email = user.email;
        
        await user.save();

        console.log("Usuario actualizado correctamente");

        return user;
    } catch (err) {
        console.error("Error al actualizar un usuario", err);
        throw err;
    }
};

exports.deleteUser = async (id) => {
    const userId = parseInt(id);

    try {
        // Buscar el usuario que deseas eliminar
        const user = await User.findByPk(userId);

        if (!user) {
            console.log("Usuario no encontrado para eliminar");
        }

        // Eliminar el usuario
        await user.destroy();
        console.log("Usuario eliminado correctamente");
        return user;
        
    } catch (err) {
        console.error("Error al eliminar un usuario:", err);
        throw err;
    }
};
