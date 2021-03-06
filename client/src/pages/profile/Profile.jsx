import React, { useState, useEffect, useContext } from 'react'
import StudentProfileStyles from './Profile.module.scss'
import student from '../../assets/student.png'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../App'
import Course from '../../components/Course'
import studentAPI from '../../api/studentAPI'


function Profile() {

    const { state } = useContext(AuthContext)
<<<<<<< HEAD
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        studentAPI.getStudentByID(state.user.id).then((response) => {
            setUser(response.data)
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
=======
    console.log(state.user.type);
    if (state.user.type == "student"){
        return (
            <StudentProfile />
        )
    }else if (state.user.type == "entrepreneur"){
        return(
            <EntrepreneurProfile />
        )
    }else{
        return(
            <TeacherProfile />
        )
    }
>>>>>>> ed809cbd886332102bf079b07d5d712c520d3a76

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
