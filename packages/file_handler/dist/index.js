"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var cors = require("cors");
var path = require("path");
var app = express();
app.use(cors());
app.use(express.static("./packages/file_handler/dist/uploads"));
function replaceNonAlphabeticCharactersWithUnderscore(str) {
    return str.replace(/[^a-zA-Z]/g, "_");
}
var storage = multer.diskStorage({
    destination: "./packages/file_handler/dist/uploads", // specify the destination folder
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        var replacedString = replaceNonAlphabeticCharactersWithUnderscore(file.originalname);
        cb(null, "".concat(replacedString).concat(ext)); // use the original file name
    },
});
var upload = multer({ storage: storage });
app.post("/file/upload", upload.single("file"), function (req, res) {
    console.log(console.log(req.file));
    res.json({ filename: req.file.filename });
});
app.listen(9090, function () { return console.log("App listening on ".concat(9090)); });
