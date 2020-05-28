const uuid = require("uuid");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

const SECRET = "this is hello world";

const generateUUID = () => {
    let uid = uuid.v1();
    uid = uid.replace(/\-/g, "");
    return uid;
};
const getCurrentTime = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = zerofill(d.getMonth() + 1);
    const date = zerofill(d.getDate());
    const hours = zerofill(d.getHours());
    const minutes = zerofill(d.getMinutes());
    const seconds = zerofill(d.getSeconds());
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const zerofill = (str) => {
    str = "0" + str;
    return str.slice(-2);
};

const verifyToken = async(ctx, next) => {
    const dataString = ctx.header.authorization;
    try {
        const dataArr = dataString.split(" ");
        const token = dataArr[1];
        let payload = await jsonwebtoken.verify(token, SECRET);
        ctx.state = payload;
        await next();
    } catch (error) {
        ctx.body = {
            code: 403,
            message: "login expired"
        };
    }
}
module.exports = {
    SECRET,
    generateUUID,
    getCurrentTime,
    verifyToken
};
