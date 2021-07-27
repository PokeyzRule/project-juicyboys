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
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const Assignment = () => {

    const { cid, aid } = useParams()
    const { state } = useContext(AuthContext)
    const user = JSON.parse(state.user);
    const [assignment, setAssignment] = useState()
    const [course, setCourse] = useState()
    const [submissions, setSubmissions] = useState([])
    const [files, setFiles] = useState([])
    const [subFiles, setSubFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        courseAPI.getCourseByID(cid).then((resp) => {
            setCourse(resp.data.course)
            resp.data.assignments.map((a) => {
                if (a.assignmentID == aid) {
                    setAssignment(a)
                    setFiles(a.uploads)
                    setLoading(false)
                    courseAPI.getSubmissionsByAssignment(aid).then((res) => {
                        setSubmissions(res.data.submissions)
                    }).catch(err => console.log(err))
                    return
                }
            })
        }).catch(err => console.log(err))
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

    const handleSubmissionUpload = (e) => {
        const file = e.target.files[0]
        
        uploadAPI.addFile(file).then((data) => {
            setSubFiles(submissions => [...submissions, data])
        }).catch((err) => console.log(err))
    }

    const handleSubmissionDelete = (name) => {
        setSubFiles(subFiles => subFiles.filter(subFile => subFile.key !== name))
    }

    const handleSubmissionSubmit = () => {
        const payload = {
            uploads: Array.from(subFiles.map((subFile) => subFile.location)),
            studentID: user.id,
            assignmentID: aid
        }
        
        courseAPI.addSubmission(payload).then(() => setOpen(true)).catch((err) => console.log(err))
    }

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleChange = (props) => (e) => {
        setSubmissions(submissions => submissions.map(x => {
            if (x.submissionID !== props.submissionID) return x
            return {...x, grade: e.target.value}
        }))

        courseAPI.addGrade({ submissionID: props.submissionID, grade: e.target.value })
    }
    
    const currentStudentGrade = () => {
        const grades = submissions.map((submission) => {
            if (submission.studentID === user.id) return submission.grade
        })
        const grade = grades.pop()
        return grade == undefined ? 0 : grade
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
                    { user.type == "student" ? <h2>Grade: {loading ? 'Loading...' : currentStudentGrade() + '%'} </h2> : <div/> }
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
                        {subFiles.map((submission) => <Chip key={submission.key} className={styles.file} label={submission.key} onDelete={() => handleSubmissionDelete(submission.key)} />)}
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
                                <TableCell>Student ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Uploads</TableCell>
                                <TableCell align="right">Upload Date</TableCell>
                                <TableCell align="right">Grade</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {submissions.map((submission) => (
                                <TableRow key={submission.submissionID}>
                                    <TableCell>{submission.studentID}</TableCell>
                                    <TableCell align="right">{submission.studentName}</TableCell>
                                    <TableCell align="right">{submission.uploads.map((upload) => (<h3><a href={upload}>{upload}</a></h3>))}</TableCell>
                                    <TableCell align="right">{new Date(submission.date).toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                    <FormControl className={styles.grade}>
                                        <Input
                                            id="standard-adornment-weight"
                                            value={submission.grade}
                                            onChange={handleChange(submission)}
                                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                            aria-describedby="standard-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight',
                                            }}
                                        />
                                        <FormHelperText id="standard-weight-helper-text">Percentage</FormHelperText>
                                    </FormControl>
                                    </TableCell>
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
