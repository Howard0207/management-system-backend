const Router = require("koa-router");
const jsonwebtoken = require("jsonwebtoken");
const sha256 = require('js-sha256');
const router = new Router();
const { findUserByMobileOrEmail } = require("../../model/user");

const SECRET = "this is hello world";
router.post("/login", async (ctx) => {
    // 判断用户名密码是否匹配
    const body = ctx.request.body;
    const [user] = await findUserByMobileOrEmail(body.username);
    const { mobile, email, password } = user;
    let checkUser =
        (body.username === mobile ||
        body.username === email) && sha256(body.password+SECRET) === password;
    if (checkUser) {
        const token = 'Bearer ' + jsonwebtoken.sign(
            { name: user.username, id: user.id }, // 加密userToken
            SECRET,
            { expiresIn: "24h" }
        );
        ctx.body = {
            code: 200,
            msg: "登录成功",
            token,
        };
    } else {
        // 登录失败, 用户名密码不正确
        ctx.body = {
            code: 400,
            msg: "用户名密码不匹配",
        };
    }
});

router.post("/fetchAccount", async (ctx) => {
    const [user] = await findUserByMobileOrEmail(15656063055);
    ctx.body = user;
});

module.exports = router.routes();
