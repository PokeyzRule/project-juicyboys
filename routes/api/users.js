const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const Entrepreneur = require('../../models/entrepreneur');


//Registering user
router.post('/register', (req, res) => {

    const { name, email, password, type } = req.body;

    if (!name || !email || !password || !type) {
        return res.status(400).json({status: "failure", msg: "Please enter all fields"})
    }

    User.findOne({email}).then(user => {
        if (user){
            return res.status(400).json({status: "failure", msg: "User already exists!"});
        }

        const newUser = new User({
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

                            // Create and upload student object
                            if(type == "student"){
                                const typedUser = new Student({
                                    name: user.name,
                                    email: user.email,
                                    currentCourses: [],
                                    password: hash,
                                    studentID: user.id
                                })
                                typedUser.save();
                            }

                            // Create and upload teacher object
                            if(type == "teacher"){
                                const typedUser = new Teacher({
                                    name: user.name,
                                    email: user.email,
                                    password: hash,
                                    currentCourses: [],
                                    teacherID: user.id
                                })
                                typedUser.save();
                            }

                            // Create and upload entrepreneur object
                            if(type == "entrepreneur"){
                                const typedUser = new Entrepreneur({
                                    name: user.name,
                                    email: user.email,
                                    password: hash,
                                    associatedStartups: [],
                                    associatedStartups: user.id
                                })
                                typedUser.save();
                            }

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

module.exports = router