import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer';
import styles from './Navbar.module.scss'
import MenuIcon from '@material-ui/icons/Menu';
import ProfilePicture from '../../assets/profile-pic.png'

function Navbar() {
    const [ toggle, setToggle ] = useState(false)


    return (
        <div className={styles.container}>
            <Drawer  open={toggle} onClose={() => {setToggle(!toggle)}}>
                <div className={styles.drawer}>

                </div>
            </Drawer> 
            <div className={styles.left}>
                <MenuIcon fontSize="large" className={styles.menu} onClick={() => { setToggle(!toggle) }} />
                <p className={styles.heading}>Juicy <span className={styles.highlight}>Boys</span></p>
            </div>
            <div className={styles.right}>
                <img src={ProfilePicture} className={styles.pic} />
            </div>
        </div>
    )
}

export default Navbar
