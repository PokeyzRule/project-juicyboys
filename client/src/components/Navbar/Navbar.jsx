import React, { useState, useContext } from 'react'
import Drawer from '@material-ui/core/Drawer';
import styles from './Navbar.module.scss'
import MenuIcon from '@material-ui/icons/Menu';
import ProfilePicture from '../../assets/profile-pic.png'
import { Link } from 'react-router-dom';
import reducer from '../../reducers/authReducer'
import { AuthContext } from '../../App'
import { useHistory } from 'react-router-dom'

function Navbar() {
    const [ toggle, setToggle ] = useState(false)

    const { state, dispatch } = useContext(AuthContext)
    const history = useHistory()


    function Logout(e) {
        e.preventDefault()
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        history.push("/login")
    }

    console.log(state)

    return (
        <div className={styles.container}>
            <Drawer  open={toggle} onClose={() => {setToggle(!toggle)}}>
                <div className={styles.drawer}>
                    <div className={styles.linkContainer}>
                        <Link className={styles.link} to="/">Home</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <Link className={styles.link} to="/profile">Profile</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <Link className={styles.link} onClick={e => Logout(e)}>Logout</Link>
                    </div>
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
