const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A book must have a name"],
    unique: true,
  },
  genre: {
    type: String,
  },
  published_year: {
    type: Number,
  },
  cover_image: {
    type: String,
  },
  ratingsAverage: {
    type: Number, 
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  descripton: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pdfAvailable: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
