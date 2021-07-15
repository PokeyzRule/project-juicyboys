const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Entrepreneur = require('../../models/entrepreneur')

/**
 * @route   GET /:id
 * @desc    Fetch a teacher's profile
 * @access  Authenticated users
 */
router.get('/:id', auth, (req, res) => {
    Entrepreneur.findOne({ entrepreneurID: req.params.id })
        .then((entrepreneur) => {

            return res.status(200).json({
                user: entrepreneur,
                status: 'Success',
                message: 'entrepreneur profile fetched successfully'
            })

        })
        .catch((err) => res.status(400).json({
            status: 'Failure',
            message: 'Unable to retrieve entrepreneur\'s profile'
        }))
})

module.exports = router