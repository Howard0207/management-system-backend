const Gallery = require("./gallery");
const Sequelize = require("sequelize");
const sequelize = require('../sequelize');
const Picture = require("../upload/sequelize");
const Op = Sequelize.Op;
const { generateUUID, getCurrentTime } = require("../../utils");

const insertGallery = (gallery, userId) => {
    const galleryInsertRes = Gallery.create({
        id: generateUUID(),
        gallery: gallery,
        userId: userId,
        crtTime: getCurrentTime(),
        updTime: getCurrentTime(),
    })
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err;
        });
    return galleryInsertRes;
};
// 查
const findGallaryByUserId = async (userId) => {
    const galleryList = await Gallery.findAll({
        where: { userId: userId },
    });
    return galleryList;
};

const findGalleryWithPictureCounts = async (userId) => {
    Gallery.hasMany(Picture, {
        foreignKey: "galleryId",
        sourceKey: "id",
    });
    Picture.belongsTo(Gallery, {
        foreignKey: "galleryId",
        targetKey: "id",
    });
    var include = [
        {
            model: Picture,
            require: true,
            attributes: [[Sequelize.fn("COUNT", Sequelize.col("path")), "count"]],
            constraints: false,
        },
    ];
    const galleryList = Gallery.findAll({
        include: include,
        group: "Gallery.id",
        raw: true,
        rollup: true,
        where: {
            userId: userId
        }
    }).then(function (result) {
        console.log(result);
        return result
    });
    // const galleryList = await sequelize.query(
    //     `SELECT galleries.*, count(pictures.path) as count FROM galleries LEFT JOIN pictures ON galleries.id=pictures.galleryId WHERE galleries.userId=${userId} group by galleries.id`
    // ).then(result => {
    //     // console.log(result) 
    //     return result;
    // });
    return galleryList;
};
// // 删
// (async () => {
//     var p = await queryFromSomewhere();
//     await p.destroy();
// })();

module.exports = {
    findGalleryWithPictureCounts,
    findGallaryByUserId,
    insertGallery,
};
