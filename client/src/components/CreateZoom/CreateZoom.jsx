import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { useParams } from 'react-router-dom'
import courseAPI from '../../api/courseAPI'

function CreateZoom({ setAssignments, handleClose }) {

    const [zoomLink, setZoomLink] = useState("")

    const { id } = useParams()
    const [title, setTitle] = useState('')

    const addLivestream = async (e) => {
        const payload = {
            title: title,
            desc: "",
            courseID: id,
            uploads: [],
            dueDate: "",
            assignedDate: new Date().toISOString(),
            toSubmit: false,
            zoomLink: zoomLink,
            isStream: true
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
                placeholder="Paste your zoom link here!"
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
                rows={1}
                label="ZoomLink"
                placeholder="Paste your zoom link here!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={zoomLink}
                variant="outlined"
                onChange={(e) => setZoomLink(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={(e) => addLivestream(e)}
            >
                Create Livestream!
            </Button>
        </div>
    )
}

export default CreateZoom
