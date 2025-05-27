const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/libraryController");

router
  .route("/")
  .get(libraryController.getUsers)
  .post(libraryController.createUser); 

module.exports = router;