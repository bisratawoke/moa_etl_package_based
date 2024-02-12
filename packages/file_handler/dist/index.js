"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.static("./packages/file_handler/dist/uploads"));
// Set up multer to handle file uploads
var storage = multer.diskStorage({
    destination: "./packages/file_handler/dist/uploads", // specify the destination folder
    filename: function (req, file, cb) {
        cb(null, file.originalname); // use the original file name
    },
});
var upload = multer({ storage: storage });
// Serve files from the public directory
// Set up a route handler to handle file uploads
app.post("/file/upload", upload.single("file"), function (req, res) {
    res.send("File uploaded successfully");
});
app.listen(9090, function () { return console.log("App listening on ".concat(9090)); });
