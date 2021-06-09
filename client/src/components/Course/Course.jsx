import React from 'react'
import styles from './Course.module.scss'

function Course({course}) {

    return (
        <div className={styles.container}>
            <div className={styles.background} style={{backgroundColor: course.color}} >
                <h1 className={styles.title}>{course.name}</h1>
                <h2 className={styles.subtitle}>{course.teacher}</h2>
            </div>
            <div className={styles.info}>
                <p className={styles.desc}>{course.description}</p>
                <button className={styles.enroll} style={{backgroundColor: course.color}}>Enroll Now!</button>
            </div>
        </div>
    )
}

export default Course
