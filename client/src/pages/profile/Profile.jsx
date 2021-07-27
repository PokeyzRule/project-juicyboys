import React, { useContext } from 'react'
import { AuthContext } from '../../App'
import EntrepreneurProfile from './EntrepreneurProfile'
import StudentProfile from './StudentProfile'
import TeacherProfile from './TeacherProfile'

function Profile() {

    const { state } = useContext(AuthContext)

    if (JSON.parse(state.user).type == "student"){
        return (
            <StudentProfile />
        )
    }else if (JSON.parse(state.user).type == "entrepreneur"){
        return(
            <EntrepreneurProfile />
        )
    }else{
        return(
            <TeacherProfile />
        )
    }


}

export default Profile
