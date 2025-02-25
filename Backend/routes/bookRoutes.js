const express = require("express");
const router = express.Router();
const bookController = require("./../controllers/bookController");

router
    .route("/")
    .get(bookController.getBooks)
    .post(bookController.createBook);

module.exports = router;