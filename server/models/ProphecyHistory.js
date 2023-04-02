const mongoose = require('mongoose');

const { Schema } = mongoose;

const prophecyHistorySchema = new Schema({
  cards: {
    type: String,
    required: true,
    trim: true
  },
  cardPosition: {
    type: String, // U = Upright, R = Reversed
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
    default: Date.now(),
  },
  user: {
    type: String,
    required: true,
  },
});

const ProphecyHistory = mongoose.model('ProphecyHistory', prophecyHistorySchema);

module.exports = ProphecyHistory;
