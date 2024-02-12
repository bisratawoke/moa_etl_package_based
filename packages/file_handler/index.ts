const express = require("express");

const multer = require("multer");
import config from "config";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("./packages/file_handler/dist/uploads"));

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: "./packages/file_handler/dist/uploads", // specify the destination folder
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name
  },
});
const upload = multer({ storage: storage });

// Serve files from the public directory

// Set up a route handler to handle file uploads
app.post("/file/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(9090, () => console.log(`App listening on ${9090}`));
