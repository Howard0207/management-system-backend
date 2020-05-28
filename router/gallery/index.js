const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { verifyToken, generateUUID, getCurrentTime } = require("../../utils");
const {
    findGallaryByUserId,
    findGalleryWithPictureCounts,
    insertGallery,
} = require("../../model/gallery");
router.use(verifyToken);
router.put("/create", async (ctx) => {
    let body = ctx.request.body;
    const gallery = body.gallery;
    const id = ctx.state.id;
    const res = await insertGallery(gallery, id);
    ctx.body = {
        code: 200,
        data: res,
        srvTime: getCurrentTime(),
    };
});

router.get("/list", async (ctx) => {
    const id = ctx.state.id;
    const res = await findGalleryWithPictureCounts(id);
    ctx.body = {
        code: 200,
        data: res,
        srvTime: getCurrentTime(),
    };
});

module.exports = router.routes();
