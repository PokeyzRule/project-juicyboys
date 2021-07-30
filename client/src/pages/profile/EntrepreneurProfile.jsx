import React, { useState, useEffect, useContext } from 'react'
import ProfileStyles from './Profile.module.scss'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../App'
import Company from '../../components/Company'
import entrepreneurAPI from '../../api/entrepreneurAPI'
import companyAPI from '../../api/companyAPI'
function EntrepreneurProfile() {
    const { state } = useContext(AuthContext)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [ startups, setStartups ] = useState([])

    useEffect(() => {
        entrepreneurAPI.getEntrepreneurByID(state.user.id).then((res) => {
            setUser(res.data.user)
            let userStartups = []
            for (let i = 0; i < res.data.user.associatedStartups.length; i++) {
                const element = res.data.user.associatedStartups[i];
                companyAPI.getCompanyByID(element).then((res) => {
                    userStartups.push(res.data.company)
                })
            }
            
            setStartups(userStartups)
            setLoading(false)
        })
    }, [])
    console.log(startups);

    return (
        <div>
            < Navbar />
            <div className={ProfileStyles.infoBar}>
                <div className={ProfileStyles.info}>
                    <h1>Name</h1>
                    <h2>{state.user.name}</h2>
                </div>
                <div className={ProfileStyles.info}>
                    <h1>Email</h1>
                    <h2>{state.user.email}</h2>
                </div>
                <div className={ProfileStyles.info}>
                    <h1>Bio</h1>
                    <h2>Lorem Ipsum</h2>
                </div>
            </div>
            <div className={ProfileStyles.wrapper}>

                <div className={ProfileStyles.container}>

                    <div className={ProfileStyles.contentContainer}>
                        <div>

                            <div>
                                <h1 className={ProfileStyles.header}>User Info</h1>
                                <p className={ProfileStyles.subheader}>Your Companies</p>
                                {loading ?
                                    <h1>Loading</h1>
                                    :
                                    <div className={ProfileStyles.courseContainer}>
                                        {startups.map((company) => {
                                            return (
                                                <Company company={company} />
                                            )
                                        })}
                                    </div>
                                }
                                <hr width="100%" size="2" color="#C4C4C4" />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    ) 
}

export default EntrepreneurProfile
