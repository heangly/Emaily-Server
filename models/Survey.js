const mongoose = require('mongoose')
const RecipientSchema = require('./Recipient')

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Survey Title is required']
  },
  body: {
    type: String,
    required: [true, 'Survey Body is required']
  },
  subject: {
    type: String,
    required: [true, 'Survey Title is required']
  },
  recipients: {
    type: [RecipientSchema],
    required: [true, 'Survey Recipients are required']
  },
  yes: {
    type: Number,
    default: 0,
    required: [true, 'Survey YES option is required']
  },
  no: {
    type: Number,
    default: 0,
    required: [true, 'Survey NO option is required']
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Survey User is required']
  },
  dateSent: {
    type: Date,
    required: [true, 'Survey Date is required']
  },
  lastResponded: {
    type: Date,
    required: [true, 'Survey Last Responded is required']
  }
})

module.exports = mongoose.model('Survey', surveySchema)
