const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submissionSchema = new Schema({
    date: {
      type: Date,
      required: true
    },
    uploads: {
      type: [String],
      default: []
    },
    studentID: {
      type: Schema.Types.ObjectId,
      auto: true
    },
    assignmentID: {
      type: Schema.Types.ObjectId,
      auto: true
    }
})

module.exports = mongoose.model('submission', submissionSchema)
