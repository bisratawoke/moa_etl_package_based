const express = require("express");
const multer = require("multer");
const config = require("config");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.static("./packages/file_handler/dist/uploads"));

function replaceNonAlphabeticCharactersWithUnderscore(str) {
  return str.replace(/[^a-zA-Z]/g, "_");
}
const storage = multer.diskStorage({
  destination: "./packages/file_handler/dist/uploads",
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let replacedString = replaceNonAlphabeticCharactersWithUnderscore(
      file.originalname
    );
    cb(null, `${replacedString}${ext}`);
  },
});
const upload = multer({ storage: storage });

app.post("/file/upload", upload.single("file"), (req, res) => {
  console.log(console.log(req.file));
  res.json({ filename: req.file.filename });
});

app.listen(9090, () => console.log(`App listening on ${9090}`));
