import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import styles from './Course.module.scss'


function Course({course}) {
    const { state } = useContext(AuthContext)
    const [ isEnrolled, setEnrolled ] = useState(false)
    console.log(course)

    function enrollCourse(e) {
        axios.post("http://localhost:5000/courses/enroll", {
            body: {
                studentID: state.user.id,
                courseID: course.courseID
            }
        }).then((resp) => {
            console.log(resp)
            setEnrolled(true)
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} style={{backgroundColor: course.color}} >
                <h1 className={styles.title}>{course.name}</h1>
                <h2 className={styles.subtitle}>{course.teacher}</h2>
            </div>
            <div className={styles.info}>
                <p className={styles.desc}>{course.description}</p>
                { isEnrolled ? 
                <button className={styles.enroll} style={{backgroundColor: course.color}}>Enrolled!</button>
                :
                <button onClick={(e) => enrollCourse(e)} className={styles.enroll} style={{backgroundColor: course.color}}>Enroll Now!</button>
                }
            </div>
        </div>
    )
}

export default Course
