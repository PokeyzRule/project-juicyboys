import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './Home.module.scss'
import { AuthContext } from '../../App'
import Course from '../../components/Course'
import StudentHome from './StudentHome'
import { useHistory } from 'react-router-dom'
import TeacherHome from './TeacherHome'
import EntrepreneurHome from './EntrepreneurHome'

function HomeHandler() {

    const { state } = useContext(AuthContext)
    const history = useHistory()

    if (!state.isAuthenticated || state.user.type == null) {
        history.push("/login")
    }

    if (state.user.type == "student") {
        return (
            <StudentHome />
        )
    } else if (state.user.type == "teacher") {
        return (
            <TeacherHome />
        )
    } else {
        return (
            <EntrepreneurHome />
        )
    }
}

export default HomeHandler

