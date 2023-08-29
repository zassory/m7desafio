

module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "El formato del correo ingresado no es correcto"
                },
            }
        }
    });
    return User;
}