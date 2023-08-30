

module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
        }
    });
    return User;
}

//email: {
    //type: DataTypes.STRING,
    // allowNull: false,
    // unique: true,
    // validate: {
    //     isEmail: {
    //         args: true,
    //         msg: "El formato del correo ingresado no es correcto"
    //     },
    // }
