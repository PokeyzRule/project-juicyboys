const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/user');


//Registering user
router.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({status: "failure", msg: "Please enter all fields"})
    }

    User.findOne({email}).then(user => {
        if (user){
            return res.status(400).json({status: "failure", msg: "User already exists!"});
        }

        const newUser = new User ({
            name,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    jwt.sign(
                        { id: user.id },
                        'africanImpactProject',
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.status(200).json(
                                {
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                }
                            )
                        }
                    )
                })
            })
        })
    })
})