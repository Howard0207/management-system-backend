const fs = require("fs");
const Koa = require("koa");
const path = require("path");
const chalk = require("chalk");
const koaBody = require("koa-body");
const Router = require("koa-router");
const koaStatic = require("koa-static");
const app = new Koa();
const koajwt = require("koa-jwt");
const jsonwebtoken = require("jsonwebtoken");
const router = new Router();
const SECRET = "this is hello world";
app.use(koaStatic(__dirname, "static"));
app.use(
    koaBody({
        formidable: {
            uploadDir: "upload-temp",
            multiples: true,
            keepExtensions: true,
        },
        multipart: true,
    })
);
// 中间件对token进行验证
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                msg: err.message,
            };
        } else {
            throw err;
        }
    });
});

app.use(
    koajwt({ secret: SECRET }).unless({
        path: [/^\/account\/(register)|(login)$/g], // 登录接口不需要验证
    })
);

// 校验token
const verifyToken = () => async (ctx, next) => {
    // console.log(ctx);
    let token = ctx.headers.authorization;
    let res;
    try {
        let result = (await jsonwebtoken.verify(token, SECRET)) || {};
        // let { exp = 0 } = result,
        //     current = Math.floor(Date.now() / 1000);
        // if (current <= exp) {
        //     res = result.data || {};
        // }
    } catch (e) {
        res = "err";
    }
    // return res;
    next();
};
// app.use(verifyToken);
// 用户账号
router.use("/account", require("./router/account"));
// 图集
router.use("/gallery", require("./router/gallery"));
router.use("/pictures", require("./router/picture"));
// 文件上传
router.use("/upload", require("./router/upload"));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log(chalk.underline.blue("http://localhost:3000") + " is serving");
});
