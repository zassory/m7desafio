

module.exports = (sequelize,DataTypes) => {
    const Bootcamp = sequelize.define('bootcamps', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cue: {
            type: DataTypes.INTEGER,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Bootcamp;
}