const mongoose = require('mongoose');

const { Schema } = mongoose;

const tarotSchema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  nameShort: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  valueInt: {
    type: Number,
    required: true,
    trim: true
  },
  suit: {
    type: String,
    trim: true
  },
  meaningUp: {
    type: String,
    required: true,
    trim: true
  },
  meaningRev: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  }
});


const Tarot = mongoose.model('Tarot', tarotSchema);

module.exports = Tarot;
