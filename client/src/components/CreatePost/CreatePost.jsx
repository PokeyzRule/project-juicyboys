import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import postAPI from '../../api/postAPI';
import { TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'
import { useParams } from "react-router-dom";

const CreatePost = ({setPosts, handleClose}) => {

    const { id } = useParams()
    const [text, setText] = useState('')
    const [mediaURL, setMediaURL] = useState('')
    const user = JSON.parse(useContext(AuthContext).state.user)

    async function addPost(e) {
        const payload = {
            courseID: id,
            userID: user.id,
            creator: user.name,
            message: text,
            mediaURL: mediaURL,
        }
        const newPost = await (await postAPI.addPost(payload)).data.post;
        setPosts(posts => [newPost, ...posts])
        handleClose()
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