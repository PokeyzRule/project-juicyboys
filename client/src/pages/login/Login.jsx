import React, { useState, useContext } from 'react'
import LoginStyles from '../signup/Login.module.scss'
import { Link } from 'react-router-dom'
import LoginImage from '../../assets/Login.png'
import { AuthContext } from '../../App'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Login() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const { state, dispatch } = useContext(AuthContext)
    const history = useHistory()

    function handleSubmit(e) {

        e.preventDefault();
        const body = JSON.stringify({ email, password })
        console.log(body)
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/login',
            data: body,
            headers: {
                'Content-Type': 'application/json',
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

    if (state.isAuthenticated){
        history.push("/")
    }

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
                                <button onClick={(e) => handleSubmit(e)} style={{backgroundColor:"#6C63FF"}}>Login</button>
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
