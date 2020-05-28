const Sequelize = require("sequelize");
const seql = require("../sequelize");
const Gallery = seql.define(
    "gallery",
    {
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true,
        },
        gallery: Sequelize.STRING(25),
        userId: Sequelize.STRING(50),
        crtTime: Sequelize.STRING(19),
        updTime: Sequelize.STRING(19),
    },
    {
        timestamps: false,
    }
);

module.exports = Gallery;
