const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");

exports.createUser = factory.createOne(User);
exports.getUsers = factory.getAll(User);