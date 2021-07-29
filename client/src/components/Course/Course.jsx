import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import courseAPI from '../../api/courseAPI'
import { AuthContext } from '../../App'
import styles from './Course.module.scss'


function Course({course}) {
    const { state } = useContext(AuthContext)
    const [ isEnrolled, setEnrolled ] = useState(course.students.includes(state.user.id))

    function enrollCourse(e) {
        e.preventDefault()

        const body = JSON.stringify({ courseID: course.courseID, studentID: state.user.id})
        
        courseAPI.enrollCourse(body).then(
            (response) => {
                setEnrolled(true)
            })
    }

    const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
      ? <Link style={{ textDecoration: 'none' }} target="_blank" to={to}>{children}</Link>
      : <>{children}</>;

    return (
        <div className={styles.container}>
            <ConditionalLink to={`/course/${course.courseID}`} condition={course.students.includes(state.user.id)}>
                <div className={styles.background} style={{backgroundColor: course.color}}>
                    <h1 className={styles.title}>{course.name}</h1>
                    <h2 className={styles.subtitle}>{course.teacher}</h2>
                </div>
            </ConditionalLink>
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
