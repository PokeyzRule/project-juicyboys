import React, { useState, useContext } from 'react'
import { AuthContext } from '../../App'
import LoginStyles from './Login.module.scss'
import LoginImage from '../../assets/SignUp.png'
import UserSelect from '../../components/userSelect'
import student from '../../assets/student.png'
import teacher from '../../assets/teacher.png'
import entrepreneur from '../../assets/entrepreneur.png'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
    const [step, setStep] = useState(0)
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { state, dispatch } = useContext(AuthContext)
    const history = useHistory()

    function submitForm(e) {
        e.preventDefault()

        const body = JSON.stringify({ name, email, password, "type": user })
        console.log(body)
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/register',
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzAxZjk2ZTk1NmRkNzFiNGFhMmY3OSIsImlhdCI6MTYyMzIxMjA2OSwiZXhwIjoxNjIzMjE1NjY5fQ.NlSABKukS_GG8h4F4tVy263dxJGQt0AO1NNsbX6lbLs'
            }
        }).then((resJson => {
            console.log(resJson)
            dispatch({
                type: "LOGIN",
                payload: resJson.data
            })
        })).catch(error => {
            console.log(error)
        })
    }

    function handleInput(userType) {
        setUser(userType.toLowerCase())
    }

    if (state.isAuthenticated) {
        console.log(state)
        history.push("/")
    }

    return (
        <div className={LoginStyles.wrapper}>
            <div className={LoginStyles.container}>
                <img src={LoginImage} />
                <div className={LoginStyles.formContainer}>
                    <div>
                        <h1 className={LoginStyles.header}>Join Us Today!</h1>
                        <p className={LoginStyles.subheader}>Become part of a growing community of students, teachers, and entrepreneurs</p>
                        {step == 0 ?
                            <div>
                                <h2>Which one are you?</h2>
                                <div className={LoginStyles.selectContainer}>
                                    <UserSelect userType="Student" image={student} active={user == "student"} handleInput={handleInput} />
                                    <UserSelect userType="Teacher" image={teacher} active={user == "teacher"} handleInput={handleInput} />
                                    <UserSelect userType="Entrepreneur" image={entrepreneur} active={user == "entrepreneur"} handleInput={handleInput} />
                                </div>
                                <div className={LoginStyles.next}>
                                    <button onClick={(e) => { setStep(1) }} style={{ backgroundColor: user == "" ? "#9A9AAC" : "#6C63FF" }}>Next</button>
                                </div>
                            </div>
                            :
                            <div className={LoginStyles.credentialsContainer}>
                                <p className={LoginStyles.label}>Name</p>
                                <input className={LoginStyles.input} onChange={(e) => setName(e.target.value)} />
                                <p className={LoginStyles.label}>Email</p>
                                <input className={LoginStyles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <p className={LoginStyles.label}>Password</p>
                                <input type="password" className={LoginStyles.input} value={password} onChange={(e) => setPassword(e.target.value)} />

                                <div className={LoginStyles.next}>
                                    <button onClick={(e) => { setStep(0) }} style={{ backgroundColor: "#9A9AAC" }}>Back</button>
                                </div>

                                <div className={LoginStyles.next}>
                                    <button onClick={(e) => { submitForm(e) }} style={{ backgroundColor: "#6C63FF" }}>Register</button>
                                </div>
                            </div>
                        }
                    </div>
                    <p className={LoginStyles.alternate}>Already have an account? <Link to="/login" className={LoginStyles.sign}>Login here!</Link></p>
                </div>
            </div>

        </div>
    )
}

export default SignUp
