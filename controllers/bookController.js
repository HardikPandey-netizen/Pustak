const Book = require('./../models/bookModel');
const factory = require('./handlerFactory');

exports.createBook = factory.createOne(Book);
exports.getBooks = factory.getAll(Book);