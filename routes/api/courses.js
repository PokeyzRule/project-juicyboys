const express = require('express')
const router = express.Router()

// Course Model
const Course = require('../../models/Course')

/**
 * @route        GET /
 * @queryParam   OPTIONAL Integer limit - results per page
 * @queryParam   OPTIONAL Integer page - page number 
 * @desc         Fetch all courses with pagination
 * @access       Authenticated users
 */
 router.get('/', (req, res) => {
    let limit = parseInt(req.query.limit) || 10
    let page = (Math.abs(req.query.page) || 1) - 1;

    Course.find()
        .limit(limit)
        .skip(limit * page)
        .then(courses => res.status(200).json(courses))
        .catch((err) => res.status(400).json(err))
})

/**
 * @route   POST create
 * @desc    Create a course
 * @access  Public
 */
router.post('/create', (req, res) => {
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