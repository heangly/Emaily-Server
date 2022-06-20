const mongoose = require('mongoose')

const recipientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  responded: {
    type: Boolean,
    default: false,
    required: [true, 'Responded is required']
  }
})

module.exports = recipientSchema
