const Library = require("./../models/libraryModel");
const factory = require("./handlerFactory");

exports.createUser = factory.createOne(Library);
exports.getUsers = factory.getAll(Library);