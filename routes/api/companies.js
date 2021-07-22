const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Models
const Company = require('../../models/company')
const Entrepreneur = require('../../models/entrepreneur')


/**
 * @route   POST addDocument
 * @desc    Add a document to the company
 * @access  Authenticated users
 */
router.post('/addDocument', auth, async (req, res) => {
  const companyID = req.body.companyID
  const newDocument = req.body.newDocument

  try {
    if (!newDocument) throw "Missing new document"

    await Company.updateOne({ companyID }, { $addToSet: { documents: newDocument } })
    res.status(200).json({
      status: 'success',
      msg: 'Document uploaded successfully',
      newDocument: newDocument
    })
  } catch {
    res.status(400).json({
      status: 'failure',
      msg: 'Document upload failed'
    })
  }
})

/**
 * @route   POST create
 * @desc    Create a company
 * @access  Authenticated users
 */
router.post('/create', auth, (req, res) => {
  const newCompany = new Company({
    name: req.body.name,
    description: req.body.description,
    owners: req.body.owners,
  })

  newCompany.save().then(company => res.json({
    status: 'success',
    msg: 'Company created successfully',
    code: company.companyID,
  })).catch(() => res.status(400)
    .json({
      status: 'failure',
      msg: 'Company creation failed',
    }))
})

/**
 * @route   POST addOwner
 * @desc    Adds an owner to a company
 * @access  Authenticated users
 */
router.post('/addOwner', auth, async (req, res) => {
  const { companyID, newOwner } = req.body

  try {
    await Company.updateOne({ companyID }, { $addToSet: { owners: newOwner } })
    res.status(200).json({
      status: 'success',
      msg: 'Owner added successfully'
    })
  } catch {
    res.status(400).json({
      status: 'failure',
      msg: 'Owner failed to add'
    })
  }

})

/**
 * @route       GET /:companyID
 * @queryParam  companyID to search
 * @desc        Fetch the company specified by the provided companyID
 * @access      Authenticated users
 */
router.get('/:companyID', auth, (req, res) => {
  Company.findOne({ companyID: req.params.companyID }).then(company => res.status(200).json({
    status: 'success',
    msg: 'Company retrieved successfully',
    company: company
  })).catch(() => res.status(400).json({
    status: 'failure',
    msg: 'Company retrieval failed',
  }))
})

/**
 * @route        GET /
 * @queryParam   OPTIONAL Integer limit - results per page
 * @queryParam   OPTIONAL Integer page - page number 
 * @desc         Fetch all companies with pagination
 * @access       Authenticated users
 */
router.get('/', (req, res) => {
  let limit = parseInt(req.query.limit) || 10
  let page = (Math.abs(req.query.page) || 1) - 1;

  Company.find()
    .limit(limit)
    .skip(limit * page)
    .then(companies => res.status(200).json({
      companies: companies,
      status: 'Success!',
      message: 'Companies retrieved!'
    }))
    .catch((err) => res.status(400).json({
      status: 'Failure!',
      message: 'Unable to retrieve companies'
    }))
})

module.exports = router
