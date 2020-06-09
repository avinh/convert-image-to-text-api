const express = require('express');
const router = express.Router();
const ocrService = require('../service/ocr');

function convertPhotoToText(req, res) {
    ocrService.DownloadBase64(req.body.file).then((fileName) => {
        ocrService.OCRFile(fileName).then(text => {
            if (text["text"] === "\f") {
                return res.send({ status: true, data: "not scan" });
            }
            return res.send({ status: true, data: text });
        });
    });
}



router.post('/ocr', convertPhotoToText);


module.exports = router;