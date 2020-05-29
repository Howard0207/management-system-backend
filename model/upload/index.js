const Picture = require("./sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { generateUUID, getCurrentTime } = require("../../utils");

const insertPicture = (path, userId) => {
    const picture = Picture.create({
        id: generateUUID(),
        path: path,
        userId: userId,
        crtTime: getCurrentTime(),
    })
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            return err;
        });
    return picture;
};
// 查
const findPictureByGalleryIdAndUserId = async (galleryId, userId) => {
    const pictures = await Picture.findAll({
        where: { galleryId: galleryId, userId: userId },
    });
    return pictures;
};
// // 删
// (async () => {
//     var p = await queryFromSomewhere();
//     await p.destroy();
// })();

module.exports = {
    findPictureByGalleryIdAndUserId,
    insertPicture,
};
