const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'Google ID is required']
  }
})

module.exports = mongoose.model('User', UserSchema)
