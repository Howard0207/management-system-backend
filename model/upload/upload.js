const Sequelize = require("sequelize");
const seql = require("../sequelize");
const Picture = seql.define(
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
        desc: Sequelize.STRING(255),
    },
    {
        timestamps: false,
    }
);
module.exports = Picture;
