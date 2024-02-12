const express = require("express");

const multer = require("multer");
import config from "config";
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.static("./packages/file_handler/dist/uploads"));

function replaceNonAlphabeticCharactersWithUnderscore(str) {
  // Replace spaces, hyphens, and any non-alphabetic characters with underscores
  return str.replace(/[^a-zA-Z]/g, "_");
}
// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: "./packages/file_handler/dist/uploads", // specify the destination folder
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let replacedString = replaceNonAlphabeticCharactersWithUnderscore(
      file.originalname
    );
    cb(null, `${replacedString}${ext}`); // use the original file name
  },
});
const upload = multer({ storage: storage });

// Serve files from the public directory

// Set up a route handler to handle file uploads
app.post("/file/upload", upload.single("file"), (req, res) => {
  console.log(console.log(req.file));
  res.json({ filename: req.file.filename });
});

app.listen(9090, () => console.log(`App listening on ${9090}`));
