

module.exports = (sequelize,DataTypes) => {
    const Bootcamp = sequelize.define('bootcamps', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cue: {
            type: DataTypes.INTEGER,
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    });
    return Bootcamp;
}