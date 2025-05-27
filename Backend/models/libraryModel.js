const mongoose = require('mongoose');
const Book = require('./bookModel');
const Review = require('./reviewModel');
const librarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A library must have a name'],
    },
    owner: {
        type: String,
        required: [true, 'A library must have a owner'],
    },
    books: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Book',
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Review',
        }
    ],
    location: {
      type: {
        type: String,
        default: 'Point',
        enumm: ['Point']
      },
      coordinates: [Number],
    },
    mode : {
        type: String,
        enum: ['user','guide','lead-guide','admin'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1,'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10
    },
    ratingQuantity: {
        type: Number
    }
})

const Library = mongoose.model('Library',librarySchema);
module.exports = Library;