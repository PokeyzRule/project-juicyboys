import React, { useState, useEffect, useContext } from 'react'
import ProfileStyles from './Profile.module.scss'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../App'
import Course from '../../components/Course'
import teacherAPI from '../../api/teacherAPI'
function TeacherProfile() {
    const { state } = useContext(AuthContext)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [ courses, setCourses ] = useState([])

    useEffect(() => {
        teacherAPI.getTeacherByID(state.user.id).then((res) => {
            setUser(res.data.user)
            setCourses(res.data.courses)
            setLoading(false)
        })
    }, [])
    console.log(courses);

    return (
        <div>
            < Navbar />
            <div className={ProfileStyles.infoBar}>
                <div className={ProfileStyles.info}>
                    <h1>Name</h1>
                    <h2>{state.user.name}</h2>
                </div>
                <div className={ProfileStyles.info}>
                    <h1>Email</h1>
                    <h2>{state.user.email}</h2>
                </div>
                <div className={ProfileStyles.info}>
                    <h1>Bio</h1>
                    <h2>Lorem Ipsum</h2>
                </div>
            </div>
            <div className={ProfileStyles.wrapper}>

                <div className={ProfileStyles.container}>

                    <div className={ProfileStyles.contentContainer}>
                        <div>

                            <div>
                                <h1 className={ProfileStyles.header}>User Info</h1>
                                <p className={ProfileStyles.subheader}>Your Recent Courses</p>
                                {loading ?
                                    <h1>Loading</h1>
                                    :
                                    <div className={ProfileStyles.courseContainer}>
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
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TeacherProfile
