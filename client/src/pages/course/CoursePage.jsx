import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import CoursePageStyles from './CoursePage.module.scss'
import Navbar from '../../components/Navbar'
import courseAPI from '../../api/courseAPI'
import CourseAssignment from '../../components/CourseAssignment/CourseAssignment'


function CoursePage() {

    const { id } = useParams()
    const [course, setCourse] = useState()
    const [pastAssignments, setPastAssignments] = useState()
    const [upcomingAssignments, setUpcomingAssignments] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        courseAPI.getCourseByID(id).then((response) => {
            setCourse(response.data)
            let past = []
            let upcoming = []
            response.data.assignments.forEach(assignment => {
                assignment.dueDate < new Date().toISOString() ?
                    past.push(assignment)
                    :
                    upcoming.push(assignment)
            })
            setPastAssignments(past)
            setUpcomingAssignments(upcoming)
            setLoading(false)
        })
    }, [id])

    return (
        <div>
            < Navbar />
            <div className={CoursePageStyles.infoBar}>
                <div className={CoursePageStyles.info}>
                    <h1>Course</h1>
                    <h2>
                        {loading ?
                            'Loading...'
                            :
                            course.course.name
                        }
                    </h2>
                </div>
                <div className={CoursePageStyles.info}>
                    <h1>Teacher</h1>
                    <h2>
                        {loading ?
                            'Loading...'
                            :
                            course.course.teacher
                        }
                    </h2>
                </div>
                <div className={CoursePageStyles.info}>
                    <h1>Description</h1>
                    <h2>
                        {loading ?
                            'Loading...'
                            :
                            course.course.description
                        }
                    </h2>
                </div>
            </div>

            <div className={CoursePageStyles.wrapper}>
                <div className={CoursePageStyles.container}>
                    <div className={CoursePageStyles.contentContainer}>
                        <div className={CoursePageStyles.assignmentsParentContainer}>
                            <h1 className={CoursePageStyles.header}>Upcoming Assignments</h1>
                            <div className={CoursePageStyles.assignmentsContainer}>
                                {loading ?
                                    <h1>Loading...</h1>
                                    :
                                    <div className={CoursePageStyles.assignmentContainer}>
                                        {!upcomingAssignments?.length ?
                                            <h2 className={CoursePageStyles.subheader}>No upcoming assignments right now!</h2>
                                            :
                                            upcomingAssignments.map(assignment => {
                                                return (
                                                    <CourseAssignment key={assignment._id} assignment={assignment} />
                                                )
                                            })}
                                    </div>
                                }
                            </div>
                            <h1 className={CoursePageStyles.header}>Past Assignments</h1>
                            <div className={CoursePageStyles.assignmentsContainer}>
                                {loading ?
                                    <h1>Loading...</h1>
                                    :
                                    <div className={CoursePageStyles.assignmentContainer}>
                                        {!pastAssignments?.length ?
                                            <h2 className={CoursePageStyles.subheader}>No past assignments yet!</h2>
                                            :
                                            pastAssignments.map(assignment => {
                                                return (
                                                    <CourseAssignment key={assignment._id} assignment={assignment} />
                                                )
                                            })}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={CoursePageStyles.postsContainer}>
                            <h1 className={CoursePageStyles.header}>Posts Feed</h1>
                            <p className={CoursePageStyles.subheader}>TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO </p>
                        </div>
                    </div>
                </div>
                <hr width="100%" size="2" color="#C4C4C4" />
            </div>

        </div>
    )

}

export default CoursePage