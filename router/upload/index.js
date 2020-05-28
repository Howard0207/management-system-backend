const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { verifyToken, generateUUID } = require("../../utils");
const { findPictureByUserId, insertPicture } = require("../../model/upload");
router.use(verifyToken);
router.post("/docs", async (ctx) => {
    let files = ctx.request.files ? ctx.request.files.file : [];
    let body = ctx.request.body;
    let result = [];
    let fileToken = body.token; // 文件标识
    let fileIndex = body.index; // 文件顺序
    if (files && !Array.isArray(files)) {
        files = [files];
    }
    files &&
        files.forEach((item) => {
            let filepath = item.path;
            let nextPath =
                filepath.slice(0, filepath.lastIndexOf("\\") + 1) +
                fileIndex +
                "-" +
                fileToken;
            if (item.size > 0 && filepath) {
                fs.rename(filepath, nextPath, (err) => {
                    if (err) throw err;
                });
            }
        });
    if (body.type === "merge") {
        const uuid = generateUUID();
        let filename = body.filename;
        let chunkCount = body.chunkCount;
        let filenameSplit = filename.split(".");
        let ext = filenameSplit[filenameSplit.length - 1];
        let staticFolder = path.resolve(__dirname, "../../static") + "/";
        tempFolder = path.resolve(__dirname, "../../upload-temp") + "/";
        let writeStream = fs.createWriteStream(`${staticFolder}${uuid}.${ext}`);
        let cindex = 0;
        function fnMergeFile() {
            let fname = `${tempFolder}${cindex}-${fileToken}`;
            let readStream = fs.createReadStream(fname);
            readStream.pipe(writeStream, { end: false });
            readStream.on("end", function () {
                fs.unlink(fname, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                if (cindex + 1 < chunkCount) {
                    cindex += 1;
                    fnMergeFile();
                }
            });
        }
        fnMergeFile();
        const url = `/static/${uuid}.${ext}`;
        try {
            await insertPicture(url, ctx.state.id);
            ctx.body = {
                code: 200,
                data: { url },
                message: "merge ok 200",
                srvTime: Date.now(),
            };
        } catch (e) {
            ctx.body = {
                code: 503,
                message: e,
                srvTime: Date.now(),
            };
        }
        return;
    }
    return (ctx.body = {
        code: 200,
        message: "上传成功",
        srvTime: Date.now(),
    });
});

module.exports = router.routes();
