const User = require("./sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// 增
// User.create({
//     id: "g-" + now,
//     name: "Gaffeyss",
//     gender: true,
//     createAt: now,
//     updateAt: now,
//     version: 0,
// })
//     .then(function (p) {
//         console.log("created." + JSON.stringify(p));
//     })
//     .catch(function (err) {
//         console.log("failed: " + err);
//     });
// 查
const findUserByMobileOrEmail = async (account) => {
    const user = await User.findAll({
        where: {
            [Op.or]: [{ email: account }, { mobile: account }],
        },
    });
    return user;
};

// // 改
// (async () => {
//     var p = await queryFromSomewhere();
//     p.gender = true;
//     p.updatedAt = Date.now();
//     p.version ++;
//     await p.save();
// })();

// // 删
// (async () => {
//     var p = await queryFromSomewhere();
//     await p.destroy();
// })();

module.exports = {
    findUserByMobileOrEmail,
};
