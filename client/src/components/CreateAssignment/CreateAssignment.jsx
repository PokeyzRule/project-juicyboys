import React, { useContext, useState } from "react";
import styles from './CreateAssignment.module.scss'
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import courseAPI from "../../api/courseAPI";
import { useParams } from "react-router-dom";

const CreateAssignment = ({setAssignments, handleClose}) => {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [uploads, setUploads] = useState([])
    const [dueDate, setDueDate] = useState("")
    const [toSubmit, setToSubmit] = useState(true)

    const addAssignment = async (e) => {
        const payload = {
            title: title,
            desc: description,
            courseID: id,
            uploads: uploads,
            dueDate: dueDate,
            assignedDate: new Date().toISOString(),
            toSubmit: toSubmit
        }
        
        const newAssignment = await (await courseAPI.addAssignment(payload)).data.assignment;
        setAssignments((assignments) => [newAssignment, ...assignments])
        handleClose()
    }

    return (
        <div> 
            <TextField
                id="outlined-full-width"
                multiline={true}
                rows={1}
                label="Title"
                placeholder="Add a title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={title}
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                id="outlined-full-width"
                multiline={true}
                rows={4}
                label="Description"
                placeholder="Add a description"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={description}
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.submitDate}>
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={toSubmit} onChange={() => setToSubmit(!toSubmit)} name="toSubmit" />}
                        label="Submission Required"
                    />
                </FormGroup>
                {toSubmit ? <form className={styles.dateContainer} noValidate>
                    <TextField
                        id="datetime-local"
                        label="Due Date"
                        type="datetime-local"
                        format="yyyy-MM-ddThh:mm"
                        value={dueDate}
                        className={styles.dateTextField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(date) => setDueDate(date.target.value)}
                    />
                </form> : <div />}
            </div> 
            <Button
                variant="contained"
                color="secondary"
                className={styles.uploadButton}
                startIcon={<CloudUploadIcon />}
            >
                Upload Files
            </Button>
            <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon/>}
                onClick={(e) => addAssignment(e)}
            >
                Create Assignment!
            </Button>
        </div>
    );
}

export default CreateAssignment;