import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../App'
import { useParams } from 'react-router'
import courseAPI from '../../api/courseAPI'
import styles from './Assignment.module.scss'
import Navbar from '../../components/Navbar'
import { Button, Chip } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Send from '@material-ui/icons/Send'
import GetAppIcon from '@material-ui/icons/GetApp'
import fileDownload from 'js-file-download'
import axios from 'axios'
import uploadAPI from '../../api/uploadAPI'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core'

const Assignment = () => {

    const { cid, aid } = useParams()
    const { state } = useContext(AuthContext)
    const uid = JSON.parse(state.user).id;
    const [assignment, setAssignment] = useState()
    const [course, setCourse] = useState()
    const [uploads, setUploads] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = React.useState(false);

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

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        
        uploadAPI.addFile(file).then((data) => {
            setUploads(uploads => [...uploads, data])
        })
    }

    const handleDelete = (name) => {
        setUploads(uploads => uploads.filter(upload => upload.key !== name))
    }

    const handleSubmit = () => {
        const payload = {
            uploads: Array.from(uploads.map((upload) => upload.location)),
            studentID: uid,
            assignmentID: aid
        }
        
        courseAPI.addSubmission(payload).then(() => setOpen(true))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    
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
                    <div style={{ marginBottom: '10px' }}>
                        {uploads.map((upload) => <Chip key={upload.key} className={styles.file} label={upload.key} onDelete={() => handleDelete(upload.key)} />)}
                    </div>
                    <input
                        hidden
                        id="contained-button-file"
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="secondary" component="span" className={styles.uploadButton} startIcon={<CloudUploadIcon />}>
                            Upload Files
                        </Button>
                    </label>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Send/>}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit Assignment!
                    </Button>
                </div>
                : <div/> }
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                        Successfully submitted assignment!
                    </MuiAlert>
                </Snackbar>
        </div>
    )
}

export default Assignment
