const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Models
const Assignment = require('../../models/assignment')
const Course = require('../../models/course')
const Student = require('../../models/student')
const Submission = require("../../models/submission")

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
    .then(course => {
      const assignmentIDs = course.assignments

      Assignment.find().where('assignmentID').in(assignmentIDs)
        .then(assignments =>
          res.status(200).json({
            status: 'success',
            msg: 'Course retrieved successfully',
            course: course,
            assignments: assignments
          })
        )
    })
    .catch(() => res.status(400).json({
      status: 'failure',
      msg: 'Course retrieval failed',
    }))
})

/**
 * @route       GET /:teacherID
 * @queryParam  teacherID to search
 * @desc        Fetch the course specified by the provided teacherID
 * @access      Authenticated users
 */
router.get("/teacher/:teacherName", auth, (req, res) => {
  Course.find({ teacher: req.params.teacherName })
    .then(courses => {
      res.status(200).json({
        status: 'success',
        msg: 'Courses retrieved successfully',
        courses: courses,
      })
    })
    .catch(() => res.status(400).json({
      status: 'failure',
      msg: 'Courses retrieval failed',
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
    course: course,
  })).catch(() => res.status(400)
    .json({
      status: 'failure',
      msg: 'Course creation failed',
    }))
})

/**
 * @route   POST createAssignment
 * @desc    Create an assignment for a course
 * @access  Authenticated users
 */
router.post('/createAssignment', async (req, res) => {
  const courseID = req.body.courseID

  var newAssignment;

  if (!req.body.isStream){
    newAssignment = new Assignment({
      title: req.body.title,
      description: req.body.desc,
      courseID: req.body.courseID,
      uploads: req.body.uploads,
      dueDate: req.body.dueDate,
      assignedDate: req.body.assignedDate,
      toSubmit: req.body.toSubmit
    })
  }else{
    newAssignment = new Assignment({
      title: req.body.title,
      description: req.body.desc,
      courseID: req.body.courseID,
      assignedDate: req.body.assignedDate,
      toSubmit: req.body.toSubmit,
      isStream: req.body.isStream,
      zoomLink: req.body.zoomLink
    })
  }


  try {
    let assignment = await newAssignment.save()
    await Course.updateOne({ courseID }, { $addToSet: { assignments: assignment.assignmentID } })

    res.status(200).json({
      status: 'success',
      msg: 'Assignment created successfully',
      assignment: assignment,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'failure',
      msg: 'Assignment creation failed',
      err: err
    })
  }

})

router.post("/updateAssignment", auth, (req, res) => {
  Assignment.updateOne({ assignmentID: req.body.assignmentID }, { $addToSet: { uploads: req.body.uploads } })
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err))
})

router.post("/submitAssignment", auth, async (req, res) => {
  const assignmentID = req.body.assignmentID;
  const studentName = await Student.findOne({ studentID: req.body.studentID }).then((student) => student.name)
  const submission = new Submission({
    date: Date.now(),
    uploads: req.body.uploads,
    studentID: req.body.studentID,
    studentName: studentName,
    assignmentID: req.body.assignmentID
  })

  try {
    let submissionConfirmation = await submission.save()

    await Assignment.updateOne({ assignmentID }, { $addToSet: { submissions: submission.submissionID } })
  
    res.status(200).json({
      status: 'success',
      msg: 'Assignment submission submitted successfully',
      submission: submission
    })
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      msg: 'Assignment submission failed',
      err: err
    })
  }

})

router.post('/addGrade', auth, (req, res) => {
  const grade = req.body.grade
  const submissionID = req.body.submissionID

  Submission.updateOne({ submissionID: submissionID }, { grade: grade })
    .then((resp) => {
      res.status(200).json({
        status: 'success',
        msg: 'Grade added!',
        submissionID: submissionID,
        grade: grade
      }
    )})
    .catch((err) => {console.log(err); res.status(400).json({
      status: 'Failure',
      msg: 'Unable to add grade',
      err: err
  })})
})

router.get('/submissions/:assignmentID', auth, (req, res) => {
  Submission.find({ assignmentID: req.params.assignmentID })
    .then(submissions => res.status(200).json({
      submissions: submissions,
      status: 'Success!',
      message: 'Courses retrieved!'
    }))
    .catch((err) => {console.log(err); res.status(400).json({
      status: 'Failure!',
      message: 'Unable to retrieve submissions'
    })})
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
