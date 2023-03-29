const mongoose = require('mongoose');

const { Schema } = mongoose;

const prophecyHistorySchema = new Schema({
  cards: {
    type: String,
    required: true,
    trim: true
  },
  cardPosition: {
    type: Number, // 0 = upright, 1 = reverse (?)
    required: true,
    trim: true
  },
  resultsAI: {
    type: String,
    required: true,
    trim: true
  },
  readingDate: {
    type: Date,
    default: Date.now(), // Likely needs to change
  },
  user: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
