import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Home.module.scss'

function Home() {
    return (
        <div className={styles.testingContainer}>
            <Navbar />
            <div className={styles.overlay}>
                <h1 className={styles.welcome}>Welcome back <span className={styles.highlight}>Keshavaa!</span></h1>
            </div>
            <div className={styles.classes}>
                <h3>New Classes</h3>
                <p>Join new and upcoming classes now!</p>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}

export default Home
