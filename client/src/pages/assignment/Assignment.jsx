import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import courseAPI from '../../api/courseAPI'
import styles from './Assignment.module.scss'
import Navbar from '../../components/Navbar'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import GetAppIcon from '@material-ui/icons/GetApp'
import fileDownload from 'js-file-download'
import axios from 'axios'

const Assignment = () => {

    const { cid, aid } = useParams()
    const [assignment, setAssignment] = useState()
    const [course, setCourse] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        courseAPI.getCourseByID(cid).then((resp) => {
            setCourse(resp.data.course)
            resp.data.assignments.map((a) => {
                if (a.assignmentID == aid) {
                    setAssignment(a)
                    setLoading(false)
                    return
                }
            })
        })
    }, [])

    const UploadLink = ({link}) => {
        return (
            <Button
                variant="contained"
                color="primary"
                className={styles.uploadLinks}
                endIcon={<GetAppIcon />}
                onClick={() => {handleDownload('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', 'test-download.jpg')}}
            >
                {link}
            </Button>
        )
    }

    const handleDownload = (url, filename) => {
        axios.get(url, {
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(res.data, filename)
        })
    }

    return (
        <div>
            <Navbar />
            <div className={styles.infoBar}>
                <div className={styles.info}>
                    <h2>{loading ? 'Loading...' : `${course.name} --- ${course.teacher}` }</h2>
                    <h1> {loading ? 'Loading...' : assignment.title}</h1>
                    <h2>Created: {loading ? 'Loading...' : new Date(assignment.assignedDate).toLocaleString()}</h2>
                    <h2>Due Date: {loading ? 'Loading...' : assignment.dueDate ? new Date(assignment.dueDate).toLocaleString() : 'N/A'}</h2>
                </div>
            </div>
            <div className={styles.description}>
                <h2>Assignment Overview</h2>
                <hr style={{ maxWidth: 260 }}/>
                <h3>{loading ? 'Loading...' : assignment.description}</h3>
            </div>
            <div className={styles.description}>
                <h2>Relevant Files</h2>
                <hr style={{ maxWidth: 170 }}/>
                <div className={styles.uploads}>
                    {loading ? <h1> 'Loading...' </h1> : assignment.uploads.map((upload) => <UploadLink link={upload} />)}
                </div>
            </div>
            { loading ? <h1> 'Loading...' </h1> : 
            assignment.toSubmit ? 
                <div className={styles.description}>
                    <h2>Upload Submissions</h2>
                    <hr style={{ maxWidth: 250 }}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Files
                    </Button>
                </div> : <div/> }
        </div>
    )
}

export default Assignment
