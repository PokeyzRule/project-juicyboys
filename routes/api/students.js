const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Student = require('../../models/teacher')
const Course = require('../../models/course')

/**
 * @route   GET /:id
 * @desc    Fetch a student's profile
 * @access  Authenticated users
 */
router.get('/:id', auth, (req, res) => {
    Student.findOne({ studentID: req.params.id })
        .then((student) => {
            const courseIDs = student.currentCourses

            Course.find({}).where('courseID').in(courseIDs).then((courses) => {
                return res.status(200).json({
                    user: student,
                    courses: courses,
                    status: 'Success',
                    message: 'Student profile fetched successfully'
                })
            })

        })
        .catch((err) => res.status(400).json({
            status: 'Failure',
            message: 'Unable to retrieve student\'s profile'
        }))
})

module.exports = router