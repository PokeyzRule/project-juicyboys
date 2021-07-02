import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './Home.module.scss'
import {AuthContext} from '../../App'
import Course from '../../components/Course'
import { useHistory } from 'react-router-dom'
import courseAPI from '../../api/courseAPI'
import postAPI from '../../api/postAPI'
import Post from '../../components/Post'

function Home() {
    const { state } = useContext(AuthContext)
    const [ courses, setCourses ] = useState([]);
    const [ loading, setLoading ] = useState(true)
    const history = useHistory()
    
    if (!state.isAuthenticated){
        history.push("/login")
    }

    useEffect(() => {
        courseAPI.getAllCourses().then((response) => {
            setCourses(response.data.courses)
            setLoading(false)
        })
    }, [])

    return (
        <div className={styles.testingContainer}>
            <Navbar />
            <div className={styles.overlay}>
                <h1 className={styles.welcome}>Welcome back <span className={styles.highlight}>Keshavaa!</span></h1>
            </div>
            <div className={styles.classes}>
                <h3>New Classes</h3>
                <p>Join new and upcoming classes now!</p>
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

export default Home
