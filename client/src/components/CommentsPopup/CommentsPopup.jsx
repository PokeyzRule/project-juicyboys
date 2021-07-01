import styles from './CommentsPopup.module.scss'
import React from 'react';
import Comment from '../Comment/Comment';

const CommentsPopup = (props) => {
    return (
        <div className={styles.popupBox}>
            <div className={styles.box}>
                <span className={styles.closeIcon} onClick={props.handleClose}>x</span>
                {props.comments.map((comment) => <Comment comment={comment}></Comment>)}
            </div>
        </div>
    );
}

export default CommentsPopup;