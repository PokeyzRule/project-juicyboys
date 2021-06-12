import React, { useState, useEffect, useContext } from 'react'
import StudentProfileStyles from './Profile.module.scss'
import student from '../../assets/student.png'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { AuthContext } from '../../App'
import Course from '../../components/Course'


function Profile() {

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
            <div className={StudentProfileStyles.infoBar}>
                <div className={StudentProfileStyles.info}>
                    <h1>Name</h1>
                    <h2>{state.user.name}</h2>
                </div>
                <div className={StudentProfileStyles.info}>
                    <h1>Email</h1>
                    <h2>{state.user.email}</h2>
                </div>
                <div className={StudentProfileStyles.info}>
                    <h1>Bio</h1>
                    <h2>Lorem Ipsum</h2>
                </div>
            </div>
            <div className={StudentProfileStyles.wrapper}>

                <div className={StudentProfileStyles.container}>

                    <div className={StudentProfileStyles.contentContainer}>
                        <div>

                            <div>
                                <h1 className={StudentProfileStyles.header}>User Info</h1>
                                <p className={StudentProfileStyles.subheader}>Your Recent Courses</p>
                                {loading ?
                                    <h1>Loading</h1>
                                    :
                                    <div className={StudentProfileStyles.courseContainer}>
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
                            <p className={StudentProfileStyles.subheader}>Don't forget your deadlines!</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile
