const Sequelize = require("sequelize");
const config = require("../../database/config");
const seqUser = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 30000,
        },
    }
);
const User = seqUser.define(
    "user",
    {
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true,
        },
        username: Sequelize.STRING(100),
        age: Sequelize.INTEGER,
        gender: Sequelize.BOOLEAN,
        email: Sequelize.STRING(35),
        mobile: Sequelize.STRING(11),
        privilege: Sequelize.TINYINT,
        password: Sequelize.STRING(255),
        crtTime: Sequelize.STRING(19),
        updTime: Sequelize.STRING(19),
    },
    {
        timestamps: false,
    }
);
module.exports = User;
