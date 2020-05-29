const Router = require("koa-router");
const router = new Router();
const { verifyToken, generateUUID, getCurrentTime } = require("../../utils");
const { findPictureByGalleryIdAndUserId } = require("../../model/upload");
router.use(verifyToken);
router.get("/list", async (ctx) => {
    const id = ctx.state.id;
    const galleryId = ctx.request.query.galleryId;
    const res = await findPictureByGalleryIdAndUserId(galleryId, id);
    ctx.body = {
        code: 200,
        data: res,
        srvTime: getCurrentTime(),
    };
});

module.exports = router.routes();
