import React, { useState, useEffect, useContext } from 'react'
import assignmentStyles from './Assignment.module.scss'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { AuthContext } from '../../App'
import courseAPI from '../../api/courseAPI'
import teacherAPI from '../../api/teacherAPI'
import Course from '../../components/Course'

function Assignment() {

    const { state, dispatch } = useContext(AuthContext)
    const [ title, setTitle] = useState("")
    const [ description, setDescription] = useState("")
    const [ courseID, setCourseID] = useState("")
    
    // const [ uploads, setUploads] = useState("")
    // const [ submissions, setSubmissions] = useState("")
    // const [ comments, setComments] = useState("")
    const [ assignedDate, setAssignedDate] = useState("")
    const [ assignmentID, setAssignmentID] = useState("")


    const d = new Date()
    const dueDate = d.getTime();
    console.log(state)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const [ newCourseName, setNewCourseName] = useState("")
    const [ newCourseDescription, setNewCourseDescription] = useState("")

    useEffect(() => {
            teacherAPI.getTeacherByID(state.user.id).then((response) => {
            setUser(response.data)
            setLoading(false)
        })
    }, []) 
    function newCourse(e){
        let req = {
            name: newCourseName,
            teacher: state.user.id,  //NEED TO CHANGE THIS TO TEACHER
            description: newCourseDescription,
            color: "#ffffff"
        }
        courseAPI.insertCourse(req).then((response) => {
            
        })
    }
    function newAssignment(e) {
        e.preventDefault();

        const data = JSON.stringify({ title, description, courseID, dueDate, assignedDate, assignmentID })

        
    }
    return (
        <div>
            < Navbar />

            <div className={assignmentStyles.wrapper}>

                <div className={assignmentStyles.container}>

                    <div className={assignmentStyles.contentContainer}>
                        <div>
                            <div className={assignmentStyles.credentialsContainer}>
                                <h1 className={assignmentStyles.header}>Create Course</h1>
                                <p className={assignmentStyles.label}>Course Name</p>
                                <input className={assignmentStyles.input} onChange={(e) => {setNewCourseName(e.target.value)}}/>
                                <p className={assignmentStyles.label}>Description</p>
                                <input className={assignmentStyles.input} onChange={(e) => {setNewCourseDescription(e.target.value)}}/>
                                <div className={assignmentStyles.next}>
                                    <button onClick={(e) => newCourse(e)} style={{backgroundColor:"#6C63FF"}}>Create Assignment</button>
                                </div>

                            </div>
                            <br/><br/>
                            <div>
                                <div className={assignmentStyles.credentialsContainer}>
                                    <h1 className={assignmentStyles.header}>Create new assigment by selecting course</h1>
                                    <div className={assignmentStyles.courseContainer}>
                                        {/* {loading ? <h1>Loading</h1> : 
                                        // courses.map((course) => {
                                        //     return(
                                        //         <Course course={course}/>
                                        //     )
                                        // })
                                        } */}
                                    </div>
                                    <p className={assignmentStyles.label}>Title</p>
                                    <input className={assignmentStyles.input} onChange={(e) => {setTitle(e.target.value)}}/>
                                    <p className={assignmentStyles.label}>Description</p>
                                    <input className={assignmentStyles.input} onChange={(e) => {setDescription(e.target.value)}}/>
                                    <p className={assignmentStyles.label}>CourseID</p>
                                    <input className={assignmentStyles.input} onChange={(e) => {setAssignedDate(e.target.value)}}/>
                                    <p className={assignmentStyles.label}>AssignmentID</p>
                                    <input className={assignmentStyles.input} onChange={(e) => {setAssignmentID(e.target.value)}}/>
                                    
                                    <div className={assignmentStyles.next}>
                                        <button onClick={(e) => newAssignment(e)} style={{backgroundColor:"#6C63FF"}}>Create Assignment</button>
                                    </div>
                                </div>
                                
                                <hr width="100%" size="2" color="#C4C4C4" />
                                <br />
                            </div>
                            <p className={assignmentStyles.subheader}>Please Fill Out all Fields</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Assignment
