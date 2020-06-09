const tesseract = require("node-tesseract-ocr")
Promise = require('bluebird');
// Recognize text of any language in any format

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const OCRFile = (fileName) => new Promise((resolve, reject) => {
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
    }

    tesseract.recognize("/home/avinh/Desktop/ocr/image.png", config)
        .then(text => {
            resolve({ text: text});
        })
        .catch(error => {
            reject(error);
            console.log(error.message)
        })
});

const DownloadBase64 = (base64) => {
    return new Promise((resolve, reject) => {
        let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        let fileName = 'files/' + makeid() + '.jpeg';
        require("fs").writeFile(fileName, base64Data, { encoding: 'base64' }, function (err) {
            if (err) {
                console.log('saving file failed');
                return reject();
            }
            resolve(fileName);
        });
    });
}

module.exports = {
    OCRFile,
    DownloadBase64
}
