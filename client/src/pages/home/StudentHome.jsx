import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './Home.module.scss'
import {AuthContext} from '../../App'
import Course from '../../components/Course'
import { useHistory } from 'react-router-dom'
import courseAPI from '../../api/courseAPI'
import companyAPI from '../../api/companyAPI'
import Company from '../../components/Company'

function StudentHome() {

    const { state } = useContext(AuthContext)
    const [ allCourses, setAllCourses ] = useState([])
    const [ courses, setCourses ] = useState([]);
    const [ companies, setCompanies ] = useState([]);
    const [ allCompanies, setAllCompanies ] = useState([]);
    const [ coursesLoading, setCoursesLoading ] = useState(true)
    const [ companiesLoading, setCompaniesLoading ] = useState(true)
    const history = useHistory()
    
    if (!state.isAuthenticated){
        history.push("/login")
    }

    useEffect(() => {
        courseAPI.getAllCourses().then((response) => {
            setCourses(response.data.courses)
            setAllCourses(response.data.courses)
            setCoursesLoading(false)
            companyAPI.allCompanies().then((res) => {
                setAllCompanies(res.data.companies);
                setCompanies(res.data.companies)
                setCompaniesLoading(false)
            })
        })


    }, [])

    const handleCourseSearch = (e) => {
        if (e.target.value != ""){
            const filteredCourses = courses.filter((course) => course.name.toLowerCase().includes(e.target.value.toLowerCase()) || course.teacher.toLowerCase().includes(e.target.value.toLowerCase()));
            setCourses(filteredCourses)
        }else{
            setCourses(allCourses)
        }
    }

    const handleCompanySearch = (e) => {
        if (e.target.value != ""){
            const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(e.target.value.toLowerCase()) || company.description.toLowerCase().includes(e.target.value.toLowerCase()));
            setCompanies(filteredCompanies)
        }else{
            setCompanies(allCompanies)
        }
    }

    return (
        <div className={styles.testingContainer}>
            <Navbar />
            <div className={styles.overlay}>
                <h1 className={styles.welcome}>Welcome back <span className={styles.highlight}>Keshavaa!</span></h1>
            </div>
            <div className={styles.header}>
                <div className={styles.classes}>
                    <h3>New Classes</h3>
                    <p>Join new and upcoming classes now!</p>
                </div>
                <div className={styles.searchContainer}>
                    <input placeholder={"Search by name or teacher!"} className={styles.search} onChange={(e) => handleCourseSearch(e)}/>
                </div>
            </div>
            <div className={styles.divider}></div>
            
            <div className={styles.courseContainer}>
                {coursesLoading ? <h1>Loading</h1> : 
                courses.map((course) => {
                    return(
                        <Course key={course.courseID} course={course}/>
                    )
                })
                }
            </div>

            <div className={styles.header}>
                <div className={styles.classes}>
                    <h3>New Startups!</h3>
                    <p>Join new and upcoming startups here!</p>
                </div>
                <div className={styles.searchContainer}>
                    <input placeholder={"Search by name or teacher!"} className={styles.search} onChange={(e) => handleCompanySearch(e)}/>
                </div>
            </div>
            <div className={styles.divider}></div>

            <div className={styles.courseContainer}>
                {companiesLoading ? <h1>Loading</h1> : 
                companies.map((company) => {
                    return(
                        <Company company={company}/>
                    )
                })
                }
            </div>
        </div>
    )
}

export default StudentHome
