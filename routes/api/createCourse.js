const express = require('express')
const router = express.Router()

// Course Model
const Course = require('../../models/Course')

/**
 * @route   POST createCourse
 * @desc    Create a course
 * @access  Public
 */
router.post('/', (req, res) => {
    const newCourse = new Course({
        name: req.body.name,
        teacher: req.body.teacher,
        description: req.body.description,
        color: req.body.color,
    })

    newCourse.save().then(course => res.json({
        status: 'success',
        msg: 'Course created successfully',
        code: course.courseID,
    })).catch(() => res.status(400)
        .json({
            status: 'failure',
            msg: 'Course creation failed',
        }))
})

module.exports = router