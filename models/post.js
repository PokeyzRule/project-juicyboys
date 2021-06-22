const mongoose = require('mongoose')
const Comment = require('./comment').schema
const Schema = mongoose.Schema

const PostSchema = new Schema({
  courseID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  media: {
    type: [String],
    required: false
  },
  likes: {
    type: [String],
    default: []
  },
  comments: {
    type: [Comment],
    default: []
  }
})

module.exports = mongoose.model('post', PostSchema)
