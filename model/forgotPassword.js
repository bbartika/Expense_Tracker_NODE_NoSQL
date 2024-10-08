const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forgotPasswordSchema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema)