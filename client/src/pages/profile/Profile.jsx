import React, { useContext } from 'react'
import { AuthContext } from '../../App'
import EntrepreneurProfile from './EntrepreneurProfile'
import StudentProfile from './StudentProfile'
import TeacherProfile from './TeacherProfile'

function Profile() {

    const { state } = useContext(AuthContext)
    console.log(state.user.type);
    if (state.user.type == "student"){
        return (
            <StudentProfile />
        )
    }else if (state.user.type == "entrepreneur"){
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
