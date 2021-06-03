import React from 'react'
import styles from './UserSelect.module.scss'

function UserSelect({ userType, image}) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{userType}</h1>
            <div className={styles.graphic}>
                <img src={image} />
            </div>
        </div>
    )
}

export default UserSelect
