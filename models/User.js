const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'Google ID is required']
  },
  stripeCustomerId: {
    type: String,
    required: [true, "Stripe's Customer ID is required"]
  },
  credits: {
    type: Number,
    default: 0,
    requiredL: [true, 'Credits are required']
  }
})

module.exports = mongoose.model('User', UserSchema)
