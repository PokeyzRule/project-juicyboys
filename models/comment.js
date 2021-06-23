const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    commentID: {
      type: Schema.Types.ObjectId,
      auto: true
    },
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('comment', CommentSchema)
