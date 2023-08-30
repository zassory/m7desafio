

module.exports = (sequelize,DataTypes) => {
    const UserBootCamp = sequelize.define('userbootcamp', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return UserBootCamp;
}