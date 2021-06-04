import React, { useState } from 'react'
import LoginStyles from '../signup/Login.module.scss'
import { Link } from 'react-router-dom'
import LoginImage from '../../assets/Login.png'

function Login() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    return (
        <div className={LoginStyles.wrapper}>
            <div className={LoginStyles.container}>
                
                <div className={LoginStyles.formContainer}>
                    <div>
                        <h1 className={LoginStyles.header}>Login!</h1>
                        <p className={LoginStyles.subheader}>Welcome Back! Check out the new classes/startups on the homepage that you may be interested in!</p>

                        <div className={LoginStyles.credentialsContainer}>
                            <p className={LoginStyles.label}>Email</p>
                            <input className={LoginStyles.input} onChange={(e) => {setEmail(e.target.value)}}/>
                            <p className={LoginStyles.label}>Password</p>
                            <input type="password" className={LoginStyles.input} onChange={(e) => {setPassword(e.target.value)}} />
                            <div className={LoginStyles.next}>
                                <button onClick={(e) => {console.log("registering!")}} style={{backgroundColor:"#6C63FF"}}>Login</button>
                            </div>
                        </div>
                    </div>
                    <p className={LoginStyles.alternate}>Don't have an account? <Link to="/signup" className={LoginStyles.sign}>Sign Up Here!</Link></p>
                </div>
                <img src={LoginImage} />
            </div>
        </div>
    )
}

export default Login
