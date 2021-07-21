import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import courseAPI from '../../api/courseAPI'
import { AuthContext } from '../../App'
import styles from './Company.module.scss'
const randomColor = require('randomcolor');

function Company({company}) {
    const { state } = useContext(AuthContext)
    
    const color = randomColor({seed: company.companyID});

    console.log(company)
   
    return (
        <div className={styles.container}>
            <div className={styles.background} style={{backgroundColor: color}} >
                <h1 className={styles.title}>{company.name}</h1>
                <h2 className={styles.subtitle}>{company.description}</h2>
            </div>
            <div className={styles.info}>
                <p className={styles.desc}>{company.owners[0] ? company.owners[0].name : "nothing to see here"}</p>
                <Link target="_blank" to={`/company/${company.companyID}`}><button className={styles.enroll} style={{backgroundColor: color}}>Learn More!</button></Link>
            </div>
        </div>
    )
}

export default Company
