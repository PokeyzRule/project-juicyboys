import React from "react";
import styles from './Comment.module.scss'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';

const Comment = ({comment, deleteComment}) => {

    return (
        <Card className={styles.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={styles.avatar}>
                    {comment.author.charAt(0).toUpperCase()}
                </Avatar>
                }
                action={
                <IconButton aria-label="delete" onClick={() => deleteComment(comment.commentID)}>
                    <Delete />
                </IconButton>
                }
                title={comment.author}
                subheader={new Date(comment.createdAt).toDateString()}
            />
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                {comment.message}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Comment;