const mongoose = require("mongoose");
const Book = require("./bookModel");
const User = requi
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true,'A review must belong to a book']
    },
    user: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true,'A review must belong to a user']
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;