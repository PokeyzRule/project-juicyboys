import React from 'react'
import styles from './CourseAssignment.module.scss'


function CourseAssignment({ assignment }) {

    function parseDate(date) {
        if (date == null) return "N/A"
         
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let month = months[parseInt(date.slice(5, 7)) - 1]
        let day = parseInt(date.slice(8, 10)).toString()
        let time = date.slice(11, 19).toString()
        return `${month} ${day} at ${time}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <h1 className={styles.title}>{assignment.title}</h1>
                <h2 className={styles.subtitle}>Due Date: {parseDate(assignment.dueDate)}</h2>
            </div>
            <div className={styles.info}>
                <p className={styles.desc}>{assignment.description}</p>
                <p className={styles.details}>Click to view details</p>
                {/* Make the whole box clickable link to more detailed assignment page */}
            </div>
        </div>
    )
}

export default CourseAssignment
