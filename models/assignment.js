const mongoose = require('mongoose')
const Comment = require('./comment').schema
const Schema = mongoose.Schema

const AssignmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  courseID: {
    type: String,
    required: true
  },
  uploads: {
    type: [String],
    default: []
  },
  submissions: {
    type: [String],
    default: []
  },
  comments: {
    type: [Comment],
    default: []
  },
  dueDate: {
    type: Date,
    required: false
  },
  assignedDate: {
    type: Date,
    required: true
  },
  toSubmit: {
    type: Boolean,
    required: true
  },
  assignmentID: {
    type: Schema.Types.ObjectId,
    auto: true
  }
})

module.exports = mongoose.model('assignment', AssignmentSchema)
