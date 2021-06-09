import React, { useState } from 'react'
import StudentProfileStyles from './Profile.module.scss'
import student from '../../assets/student.png'
import entrepreneur from '../../assets/entrepreneur.png'
import { Link } from 'react-router-dom'

function Profile() {
    const [step, setStep] = useState(0)
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const Form = () => {

        if (step == 0){
            return(
                <div>
                    <h2>Which one are you?</h2>
                    <div className={StudentProfileStyles.selectContainer}>
                    </div>
                    <div className={StudentProfileStyles.next}>
                        <button onClick={(e) => {setStep(1)}} style={{backgroundColor: user == "" ? "#9A9AAC" : "#6C63FF"}}>Next</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className={StudentProfileStyles.credentialsContainer}>
                    <p className={StudentProfileStyles.label}>Name</p>
                    <input className={StudentProfileStyles.input} onChange={(e) => {setName(e.target.value)}}/>
                    <p className={StudentProfileStyles.label}>Email</p>
                    <input className={StudentProfileStyles.input} onChange={(e) => {setEmail(e.target.value)}}/>
                    <p className={StudentProfileStyles.label}>Password</p>
                    <input type="password" className={StudentProfileStyles.input} onChange={(e) => {setPassword(e.target.value)}} />

                    <div className={StudentProfileStyles.next}>
                        <button onClick={(e) => {setStep(0)}} style={{backgroundColor: "#9A9AAC" }}>Back</button>
                    </div>

                    <div className={StudentProfileStyles.next}>
                        <button onClick={(e) => {console.log("registering!")}} style={{backgroundColor:"#6C63FF"}}>Register</button>
                    </div>
                </div>
            )
        }

    }


    function handleInput(userType){
        setUser(userType)
    }


    return (
        <div className={StudentProfileStyles.wrapper}>
            <div className={StudentProfileStyles.navBar}>
                <p>Company Name</p>

            </div>
            <div className={StudentProfileStyles.container}>
                
                <div className={StudentProfileStyles.contentContainer}>
                    <div>
                        <div className={StudentProfileStyles.infoBar}>
                                <h2>Anthony Davis</h2>
                                <p>information</p>
                                <p>information</p>
                                <p>information</p>
                        </div>
                        <div>
                            
                            <img src={student} alt="error"/>
                            <h1 className={StudentProfileStyles.header}>User Info</h1>
                            <p className={StudentProfileStyles.subheader}>Your Recent Courses</p>
                            <hr width="100%" size="5" color="#3F3D56"/>
                            <br/>
                        </div>
                        <p className={StudentProfileStyles.subheader}>Don't forget your deadlines!</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Profile
