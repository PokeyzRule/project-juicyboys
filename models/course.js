const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  students: {
    type: [String],
    default: [],
  },
  posts: {
    type: [Object],
    default: [],
  },
  color: {
    type: String,
    required: true,
  },
  courseID: {
    type: Schema.Types.ObjectId,
    auto: true,
  }
})

module.exports = mongoose.model('course', CourseSchema)
