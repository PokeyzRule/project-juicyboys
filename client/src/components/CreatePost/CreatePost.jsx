import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import postAPI from '../../api/postAPI';
import styles from './CreatePost.module.scss'
import { TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'

const CreatePost = ({posts, setPosts, courseID, handleClose}) => {

    const [text, setText] = useState('')
    const [mediaURL, setMediaURL] = useState('')
    const user = JSON.parse(useContext(AuthContext).state.user)

    async function addPost(e) {
        const payload = {
            courseID: courseID,
            userID: user.id,
            creator: user.name,
            message: text,
            mediaURL: mediaURL,
        }
        const newPost = await (await postAPI.addPost(payload)).data.post;
        setPosts([newPost, ...posts])
        handleClose()
    }

    return (
        <div className={styles.popupBox}>
            <div className={styles.box}>
                <span className={styles.closeIcon} onClick={handleClose}>x</span>
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
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon/>}
                    onClick={(e) => addPost(e)}
                >
                    Create Post!
                </Button>
            </div>
        </div>
    );
}

export default CreatePost;