const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: {
        $and: Sequelize.Op.and,
        $or: Sequelize.Op.or,
        $eq: Sequelize.Op.eq,
    },
    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.bootcamps = require("./bootcamp.model")(sequelize, Sequelize);
db.user_bootcamp = require("./user_bootcamp.model")(sequelize, Sequelize); // Corregido el nombre del modelo

// Corregido el nombre del modelo en la definición de relaciones
db.users.belongsToMany(db.bootcamps, {
    through: db.user_bootcamp,
    as: 'bootcamps',
    foreignKey: "userId"
});

db.bootcamps.belongsToMany(db.users, {
    through: db.user_bootcamp,
    as: "users",
    foreignKey: "bootcampId"
});

module.exports = db;

// db.users.hasMany(db.user_bootcamp, {
//     foreignKey: 'id_user',
//     sourceKey: 'id'
// });

// db.user_bootcamp.belongsTo(db.users, {
//     foreignKey: 'id_user',
//     targetKet: 'id',
// });

// db.bootcamps.hasMany(db.user_bootcamp, {
//     foreignKey: 'id_bootcamp',
//     targetKey: 'id'
// });

// db.users.belongsToMany(db.bootcamps, {
//     through: "user_bootcamp",
//     as: 'bootcamps',
//     foreignKey: "user_id",
// });

// db.bootcamps.belongsToMany(db.users, {
//     through: "user_bootcamp",
//     as: 'users',
//     foreignKey: 'bootcamp_id',
// });