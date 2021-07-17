import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import postAPI from '../../api/postAPI';
import { TextField, Button, Chip } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'
import { useParams } from "react-router-dom";
import uploadAPI from "../../api/uploadAPI";
import styles from './CreatePost.module.scss'
import CloudUpload from "@material-ui/icons/CloudUpload";

const CreatePost = ({setPosts, handleClose}) => {

    const { id } = useParams()
    const [text, setText] = useState('')
    const [mediaURL, setMediaURL] = useState()
    const user = JSON.parse(useContext(AuthContext).state.user)

    async function addPost(e) {
        const payload = {
            courseID: id,
            userID: user.id,
            creator: user.name,
            message: text,
            mediaURL: mediaURL ? mediaURL.location : null,
        }
        const newPost = await (await postAPI.addPost(payload)).data.post;
        setPosts(posts => [newPost, ...posts])
        handleClose()
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        
        uploadAPI.addFile(file).then((data) => {
            setMediaURL(data)
        })
    }

    const handleDelete = (name) => {
        setMediaURL(null)
    }

    return (
        <div> 
            <TextField
            id="outlined-full-width"
            multiline={true}
            rows={6}
            label="Post"
            placeholder="Add a new post!"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            value={text}
            variant="outlined"
            onChange={(e) => setText(e.target.value)}
            />
            <div style={{ marginBottom: '10px' }}>
                { mediaURL ? <Chip className={styles.file} label={mediaURL.key} onDelete={() => handleDelete(mediaURL.key)} /> : <div></div> }
            </div>
            {mediaURL ? <div> 
                <img className={styles.media} src={mediaURL.location} alt="postMedia"/> 
            </div> : null}
            <input
                hidden
                id="contained-button-file"
                type="file"
                onChange={handleFileUpload}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="secondary" component="span" className={styles.uploadButton} startIcon={<CloudUpload />}>
                    Upload Image
                </Button>
            </label>
            <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon/>}
                onClick={(e) => addPost(e)}
            >
                Create Post!
            </Button>
        </div>
    );
}

export default CreatePost;