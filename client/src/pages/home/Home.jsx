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
        </div>
    )
}

export default Home
