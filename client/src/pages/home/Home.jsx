import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './Home.module.scss'
import {AuthContext} from '../../App'
import axios from 'axios'
import Course from '../../components/Course'
import { useHistory } from 'react-router-dom'

function Home() {
    const { state, dispatch } = useContext(AuthContext)
    const [ courses, setCourses ] = useState([]);
    const [ loading, setLoading ] = useState(true)
    const history = useHistory()
    
    if (!state.isAuthenticated){
        history.push("/login")
    }

    useEffect(() => {
        axios.get("http://localhost:5000/courses/", {
            headers: {
                token: state.token
            }
        }).then((resp) => {
            setCourses(resp.data.courses)
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
