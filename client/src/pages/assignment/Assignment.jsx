import React, { useState, useEffect, useContext } from 'react'
import assignmentStyles from './Assignment.module.scss'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { AuthContext } from '../../App'
import Course from '../../components/Course'


function Assignment() {

    const { state, dispatch } = useContext(AuthContext)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    console.log(state)

    useEffect(() => {
        axios.get(`http://localhost:5000/students/${state.user.id}`, {
            headers: {
                token: state.token
            }
        }).then((resp) => {
            setUser(resp.data)
            console.log(resp.data)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            < Navbar />
            <div className={assignmentStyles.infoBar}>
                <div className={assignmentStyles.info}>
                    <h1>Name</h1>
                    <h2>{state.user.name}</h2>
                </div>
                <div className={assignmentStyles.info}>
                    <h1>Email</h1>
                    <h2>{state.user.email}</h2>
                </div>
                <div className={assignmentStyles.info}>
                    <h1>Bio</h1>
                    <h2>Lorem Ipsum</h2>
                </div>
            </div>
            <div className={assignmentStyles.wrapper}>

                <div className={assignmentStyles.container}>

                    <div className={assignmentStyles.contentContainer}>
                        <div>

                            <div>
                                <h1 className={assignmentStyles.header}>User Info</h1>
                                <p className={assignmentStyles.subheader}>Your Recent Courses</p>
                                {loading ?
                                    <h1>Loading</h1>
                                    :
                                    <div className={assignmentStyles.courseContainer}>
                                        {user.courses.map((course) => {
                                            return (
                                                <Course course={course} />
                                            )
                                        })}
                                    </div>
                                }
                                <hr width="100%" size="2" color="#C4C4C4" />
                                <br />
                            </div>
                            <p className={assignmentStyles.subheader}>Don't forget your deadlines!</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Assignment
