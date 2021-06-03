import React from 'react'
import LoginStyles from './Login.module.scss'
import LoginImage from '../../assets/Login.png'
import UserSelect from '../../components/userSelect'
import student from '../../assets/student.png'
import teacher from '../../assets/teacher.png'
import entrepreneur from '../../assets/entrepreneur.png'

function Login() {
    return (
        <div className={LoginStyles.wrapper}>
            <div className={LoginStyles.container}>
                <img src={LoginImage} />
                <div className={LoginStyles.formContainer}>
                    <h1 className={LoginStyles.header}>Join Us Today!</h1>
                    <p>Become part of a growing community of students, teachers, and entrepreneurs</p>
                    <h2>Which one are you?</h2>
                    <div className={LoginStyles.selectContainer}>
                        <UserSelect userType="Student" image={student} />
                        <UserSelect userType="Teacher" image={teacher} />
                        <UserSelect userType="Entrepreneur" image={entrepreneur} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
