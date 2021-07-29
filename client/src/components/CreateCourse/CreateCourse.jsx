import { React, useState } from "react"
import { Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send"
import styles from './CreateCourse.module.scss'
import courseAPI from "../../api/courseAPI";

const randomColor = require('randomcolor');

const CreateCourse = ({teacher, updateCourses, handleClose}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const color = randomColor()

    const handleSubmit = () => {
        courseAPI.insertCourse({
            name: name,
            teacher: teacher,
            description: description,
            color: color
        }).then((course) => {
            updateCourses(course.data.course)
            handleClose()
        })
    }
    
    return (
        <div className={styles.popupBox}>
            <div className={styles.box}>
                <span className={styles.closeIcon} onClick={handleClose}>x</span>
                <div>
                    <TextField
                        id="outlined-full-width"
                        multiline={true}
                        rows={1}
                        label="Name"
                        placeholder="Add a name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={name}
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
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
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={handleSubmit}
                    >
                        Create Course!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCourse