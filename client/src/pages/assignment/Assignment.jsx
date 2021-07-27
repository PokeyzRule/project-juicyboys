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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Assignment = () => {

    const { cid, aid } = useParams()
    const { state } = useContext(AuthContext)
    const user = JSON.parse(state.user);
    const [assignment, setAssignment] = useState()
    const [course, setCourse] = useState()
    const [submissions, setSubmissions] = useState([])
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        courseAPI.getCourseByID(cid).then((resp) => {
            setCourse(resp.data.course)
            resp.data.assignments.map((a) => {
                if (a.assignmentID == aid) {
                    setAssignment(a)
                    setFiles(a.uploads)
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
            const newFiles = files.concat(data.location)
            setFiles(newFiles)
            const payload = {
                uploads: Array.from(newFiles),
                assignmentID: aid
            }
            courseAPI.addAssignmentFiles(payload)
        }).catch((err) => console.log(err))
    }

    const handleFileDelete = (name) => {
        setFiles(files => files.filter(file => file.key !== name))
    }

    const handleSubmissionUpload = (e) => {
        const file = e.target.files[0]
        
        uploadAPI.addFile(file).then((data) => {
            setSubmissions(submissions => [...submissions, data])
        }).catch((err) => console.log(err))
    }

    const handleSubmissionDelete = (name) => {
        setSubmissions(submissions => submissions.filter(submission => submission.key !== name))
    }

    const handleSubmissionSubmit = () => {
        const payload = {
            uploads: Array.from(submissions.map((submission) => submission.location)),
            studentID: user.id,
            assignmentID: aid
        }
        
        courseAPI.addSubmission(payload).then(() => setOpen(true)).catch((err) => console.log(err))
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
                    {loading ? <h1> 'Loading...' </h1> : files.map((file) => <UploadLink link={file} />)}
                </div>
                {/* <div style={{ marginBottom: '10px' }}>
                        {files.map((file) => <Chip key={file.key} className={styles.file} label={file.key} onDelete={() => handleFileDelete(file.key)} />)}
                </div> */}
                { user.type == "teacher" ? 
                    <div>
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
                    </div>
                    : <div />
                }
            </div>
            { loading ? <h1> 'Loading...' </h1> : 
            assignment.toSubmit && user.type == "student" ? 
                <div className={styles.description}>
                    <h2>Upload Submissions</h2>
                    <hr style={{ maxWidth: 250 }}/>
                    <div style={{ marginBottom: '10px' }}>
                        {submissions.map((submission) => <Chip key={submission.key} className={styles.file} label={submission.key} onDelete={() => handleSubmissionDelete(submission.key)} />)}
                    </div>
                    <input
                        hidden
                        id="contained-button-file"
                        type="file"
                        onChange={handleSubmissionUpload}
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
                        onClick={(e) => handleSubmissionSubmit(e)}
                    >
                        Submit Assignment!
                    </Button>
                </div>
            : <div/> }
            { loading ? <h1> 'Loading...' </h1> : 
            assignment.toSubmit && user.type == "teacher" ? 
                <div className={styles.description}>
                    <h2>Student Submissions</h2>
                    <hr style={{ maxWidth: 250 }}/>
                    <TableContainer className={styles.table} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Uploads</TableCell>
                                <TableCell align="right">Upload Date</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {assignment.submissions.map((submission) => (
                                <TableRow key={submission.studentName}>
                                    <TableCell>{submission.studentID}</TableCell>
                                    <TableCell align="right">{submission.studentName}</TableCell>
                                    <TableCell align="right">{submission.uploads.map((upload) => (<h3><a href={upload}>{upload}</a></h3>))}</TableCell>
                                    <TableCell align="right">{new Date(submission.date).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
