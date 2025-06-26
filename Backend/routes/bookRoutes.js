const express = require("express");
const router = express.Router();
const bookController = require("./../controllers/bookController");
const authController = require("./../controllers/authController")

router
    .route("/")
    .get(bookController.getBooks)
    .post(authController.protect,authController.restrictTo('admin','store-manager'),bookController.createBook);

module.exports = router;