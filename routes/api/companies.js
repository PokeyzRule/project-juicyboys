const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Models
const Company = require('../../models/company')

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

module.exports = router
