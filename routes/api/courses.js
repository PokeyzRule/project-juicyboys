const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Models
const Course = require('../../models/course')
const Student = require('../../models/student')

/**
 * @route        GET /
 * @queryParam   OPTIONAL Integer limit - results per page
 * @queryParam   OPTIONAL Integer page - page number 
 * @desc         Fetch all courses with pagination
 * @access       Authenticated users
 */
router.get('/', auth, (req, res) => {
  let limit = parseInt(req.query.limit) || 10
  let page = (Math.abs(req.query.page) || 1) - 1;

  Course.find()
    .limit(limit)
    .skip(limit * page)
    .then(courses => res.status(200).json({
      courses: courses,
      status: 'Success!',
      message: 'Courses retrieved!'
    }))
    .catch((err) => res.status(400).json({
      status: 'Failure!',
      message: 'Unable to retrieve courses'
    }))
})

/**
 * @route       GET /:courseID
 * @queryParam  courseID to search
 * @desc        Fetch the course specified by the provided courseID
 * @access      Authenticated users
 */
router.get("/:courseID", auth, (req, res) => {
  Course.findOne({ courseID: req.params.courseID })
    .then(course => res.status(200).json({
      status: 'success',
      msg: 'Course retrieved successfully',
      course: course,
    }))
    .catch(() => res.status(400).json({
      status: 'failure',
      msg: 'Course retrieval failed',
    }))
})

/**
 * @route   POST create
 * @desc    Create a course
 * @access  Authenticated users
 */
router.post('/create', auth, (req, res) => {
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

/**
 * @route   POST enroll
 * @desc    Enroll a student in a course
 * @access  Authenticated users
 */
router.post('/enroll', auth, async (req, res) => {
  const { courseID, studentID } = req.body

  try {
    await Course.updateOne({ courseID }, { $addToSet: { students: studentID } })
    await Student.updateOne({ studentID }, { $addToSet: { currentCourses: courseID } })
    res.status(200).json({
      status: 'success',
      msg: 'Student enrolled successfully',
      course: courseID
    })
  } catch (err) {
    res.status(400)
      .json({
        status: 'failure',
        msg: 'Student enrollment failed',
        err: err
      })
  }
})

module.exports = router
