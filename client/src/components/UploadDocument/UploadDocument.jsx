import React, { useState } from "react";
import styles from './UploadDocument.module.scss'
import { Button, Paper } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'
import ClearIcon from '@material-ui/icons/Clear'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import companyAPI from "../../api/companyAPI";
import { useParams } from "react-router-dom";
import uploadAPI from "../../api/uploadAPI";
import { Chip } from "@material-ui/core";

const CreateAssignment = ({ setDocuments, handleClose }) => {

    const { id } = useParams()
    const [uploads, setUploads] = useState([])

    const uploadDocument = async (e) => {
        const payload = {
            companyID: id,
            uploads: Array.from(uploads.map((upload) => upload.location))
        }

        const newDocument = await (await companyAPI.addDocument(payload)).data.newDocument;
        setDocuments((documents) => [...documents, ...newDocument])
        handleClose()
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]

        uploadAPI.addFile(file).then((data) => {
            setUploads(uploads => [...uploads, data])
        })
    }

    const handleDelete = (name) => {
        // uploadAPI.removeFile(name).catch((err) => console.log(err))
        setUploads(uploads => uploads.filter(upload => upload.key !== name))
    }

    return (
        <div className={styles.popupBox}>
            <div className={styles.box}>
                <span className={styles.closeIcon} onClick={handleClose}><ClearIcon /></span>
                <Paper square style={{ boxShadow: "none" }}>
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
                        <Button variant="contained"
                            color="secondary"
                            component="span"
                            className={styles.uploadButton}
                            startIcon={<CloudUploadIcon />}>
                            Choose Files
                        </Button>
                    </label>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={(e) => uploadDocument(e)}>
                        Upload Documents
                    </Button>
                </Paper>
            </div>
        </div>
    );
}

export default CreateAssignment;