const User = require('./../models/userModel');
const factory = require('./handlerFactory');

exports.createUser = factory.createOne(User);
exports.getUsers = factory.getAll(User);