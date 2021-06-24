const mongoose = require('mongoose')
const Comment = require('./comment').schema
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    postID: {
      type: Schema.Types.ObjectId,
      auto: true
    },
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
    mediaURL: {
      type: String,
      required: false
    },
    likes: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('post', PostSchema)
