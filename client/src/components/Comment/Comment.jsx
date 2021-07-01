import React from "react";
import styles from './Comment.module.scss'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import studentAPI from "../../api/studentAPI";

const Comment = (props) => {

    const getAuthor = (userID) => {
        studentAPI.getStudentByID(userID).then((student) => student.name)
    }

    return (
        <Card className={styles.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={styles.avatar}>
                    U
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={props.comment.author}
                subheader={new Date(props.comment.createdAt).toDateString()}
            />
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                {props.comment.message}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Comment;