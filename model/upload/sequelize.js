const Sequelize = require("sequelize");
const config = require("../../database/config");

const pictures = new Sequelize(
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
const Picture = pictures.define(
    "picture",
    {
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true,
        },
        path: Sequelize.STRING(50),
        userId: Sequelize.STRING(50),
        galleryId: Sequelize.STRING(50),
        crtTime: Sequelize.STRING(19),
    },
    {
        timestamps: false,
    }
);
module.exports = Picture;
