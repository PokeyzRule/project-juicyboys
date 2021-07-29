import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './Home.module.scss'
import {AuthContext} from '../../App'
import Course from '../../components/Course'
import AddIcon from '@material-ui/icons/Add'
import { Button } from '@material-ui/core';
import CreateCourse from '../../components/CreateCourse'
import courseAPI from '../../api/courseAPI'


function TeacherHome() {

    const { state } = useContext(AuthContext)
    const [ courses, setCourses ] = useState([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    useEffect(() => {
        courseAPI.getCoursesByTeacher(state.user.name).then((res) => {
            setCourses(res.data.courses)
            setLoading(false)
        })
    }, [])

    const updateCourses = (course) => {
        setCourses([...courses, course])
    }

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
                <div className={styles.create}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<AddIcon />}
                        onClick={toggleModal}
                    >
                        Create Course
                    </Button>
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
            <div> 
            {isOpen && <CreateCourse teacher={state.user.name} updateCourses={updateCourses} handleClose={toggleModal}/>}
            </div>
        </div>
    )
}

export default TeacherHome