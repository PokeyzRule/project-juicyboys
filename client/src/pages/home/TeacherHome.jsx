import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './Home.module.scss'
import teacherAPI from '../../api/teacherAPI'
import {AuthContext} from '../../App'
import Course from '../../components/Course'

function TeacherHome() {

    const { state } = useContext(AuthContext)
    const [ courses, setCourses ] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        teacherAPI.getTeacherByID(state.user.id).then((res) => {
            setCourses(res.data.courses)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Navbar />
            <div className={styles.overlay}>
                <h1 className={styles.welcome}>Welcome back <span className={styles.highlight}>Keshavaa!</span></h1>
            </div>
            <div className={styles.header}>
                <div className={styles.classes}>
                    <h3>Your Classes</h3>
                    <p>See all of your classes here!</p>
                </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.courseContainer}>
                {loading ? <h1>Loading</h1> : 
                courses.map((course) => {
                    return(
                        <Course course={course}/>
                    )
                })
                }
            </div>
        </div>
    )
}

export default TeacherHome