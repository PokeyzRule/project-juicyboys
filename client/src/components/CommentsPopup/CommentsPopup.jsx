import styles from './CommentsPopup.module.scss'
import React, { useState } from 'react';
import Comment from '../Comment/Comment';
import { TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'
import postAPI from '../../api/postAPI';

const CommentsPopup = ({post, author, comments, setComments, handleClose}) => {

    const [text, setText] = useState('')

    async function addComment(e) {
        const payload = {
            postID: post.postID,
            author: author,
            message: text
        }
        const newComment = (await postAPI.addComment(payload)).data.comment;
        setComments([...comments, newComment])
        setText('')
    }

    async function deleteComment(id) {
        await postAPI.deleteCommentById(id)
        setComments(comments.filter(comment => comment.commentID !== id))
    }

    return (
        <div className={styles.popupBox}>
            <div className={styles.box}>
                <span className={styles.closeIcon} onClick={handleClose}>x</span>
                {comments.map((comment) => <Comment comment={comment} deleteComment={deleteComment}></Comment>)}
                <TextField
                    id="outlined-full-width"
                    label="Comment"
                    placeholder="Add a new comment!"
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
                    onClick={(e) => addComment(e)}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

export default CommentsPopup;