// backend/models/estimate.js
const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required.'],
    minlength: [3, 'Full name must be at least 3 characters long.'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required.'],
    minlength: [10, 'Phone number seems too short.'],
    trim: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required.'],
    minlength: [10, 'Message must be at least 10 characters long.'],
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'New',
  },
});

estimateSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Estimate', estimateSchema);
