var express = require("express");
var router = express.Router();
const {
  signIn,
  signUp,
  insertUserDetail,
  fetchAllUserDetail,
} = require("../controller/user.controller");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST users listing
router.post("/signIn", signIn);
router.post("/signup", signUp);
router.put(
  "/insertUserDetail",
  auth,
  imageUpload.single("profile_pic"),
  insertUserDetail
);
router.get("/fetchAllUserDetail", fetchAllUserDetail);

module.exports = router;
