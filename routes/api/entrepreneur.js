const express = require('express')
const  Company = require('../../models/company')
const router = express.Router()
const auth = require('../../middleware/auth')

const Entrepreneur = require('../../models/entrepreneur')

/**
 * @route   GET /email/:email
 * @desc    Fetch an entrepreneur's profile by email
 * @access  Authenticated users
 */
router.get('/email/:email', auth, async (req, res) => {
    console.log(req)
    try {
        email = req.params.email
        entrepreneur = await Entrepreneur.findOne({ email: email })
        return res.status(200).json({
            user: entrepreneur,
            status: 'Success',
            message: 'Entrepreneur profile fetched successfully!'
        })
    } catch {
        res.status(400).json({
            status: 'Failure',
            message: 'Unable to retreieve entrepreneur\'s profile via email'
        })
    }

})

/**
 * @route   GET /:id
 * @desc    Fetch an entrepreneur's profile
 * @access  Authenticated users
 */
router.get('/:id', auth, (req, res) => {
    Entrepreneur.findOne({ entrepreneurID: req.params.id })
        .then((entrepreneur) => {

            const startupIDs = entrepreneur.associatedStartups
            
            Company.find({}).where('companyID').in(startupIDs).then((startups) => {
                return res.status(200).json({
                    user: entrepreneur,
                    status: 'Success',
                    message: 'entrepreneur profile fetched successfully',
                    startups: startups
                })
            })

            

        })
        .catch((err) => res.status(400).json({
            status: 'Failure',
            message: 'Unable to retrieve entrepreneur\'s profile'
        }))
})

module.exports = router