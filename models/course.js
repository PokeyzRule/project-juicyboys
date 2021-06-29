const mongoose = require('mongoose')
const Post = require('./post').schema
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
  assignments: {
    type: [String],
    default: []
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
