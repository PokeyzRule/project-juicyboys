const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  postID: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('comment', CommentSchema)
