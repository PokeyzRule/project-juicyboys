const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Teacher = require('../../models/teacher')
const Course = require('../../models/course')

/**
 * @route   GET /:id
 * @desc    Fetch a teacher's profile
 * @access  Authenticated users
 */
router.get('/:id', auth, (req, res) => {
    Teacher.findOne({ teacherID : req.params.id })
        .then((teacher) => {
            const courseIDs = teacher.currentCourses
            
            Course.find({}).where('courseID').in(courseIDs).then((courses) => {
                return res.status(200).json({
                    user: teacher,
                    status: 'Success',
                    message: 'teacher profile fetched successfully',
                    courses: courses
                })
            })

        })
        .catch((err) => res.status(400).json({
            status: 'Failure',
            message: 'Unable to retrieve teacher\'s profile'
        }))
})

module.exports = router