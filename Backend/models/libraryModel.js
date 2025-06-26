const mongoose = require('mongoose');
const Book = require('./bookModel');
const User = require('./userModel');
const Review = require('./reviewModel');
const librarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A library must have a name'],
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'A library must have a owner'],
    },
    Image: String,
    books: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
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
        enum: ['library','bookstore','second-hand-bookstore'],
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