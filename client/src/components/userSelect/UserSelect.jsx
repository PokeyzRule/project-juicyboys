import React, { useState, useEffect } from 'react'
import styles from './UserSelect.module.scss'


function UserSelect({ userType, image, active, handleInput}) {
    const [style, setStyle] = useState(active)

    useEffect(() => {
        setStyle(active ? " " + styles.active : "")
    }, [active])

    function checkStyles(){
        return style ? " " + styles.active : ""
    }

    return (
        <div className={styles.container + checkStyles()} onClick={(e) => {handleInput(userType)}}>
            <h1 className={styles.title}>{userType}</h1>
            <div className={styles.graphic}>
                <img src={image} />
            </div>
        </div>
    )
}

export default UserSelect
