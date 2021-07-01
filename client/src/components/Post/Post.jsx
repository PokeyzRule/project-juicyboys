import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from './Post.module.scss'
import CommentsPopup from '../CommentsPopup/CommentsPopup';
import postAPI from '../../api/postAPI';

function Post({ post }) {
    
    const { state } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const [likes, setLikes] = useState(post.likes);

    const handleClick = (event) => {
        
    };

    const openComments = () => {
        setIsOpen(!isOpen);
    }

    const toggleLike = async () => {
        const like = {
            postID: post.postID,
            likerID: state.user.id
        };
        if (!likes.includes(state.user.id)) {
            setLikes([...likes, state.user.id])
            await postAPI.addLike(like)
        } else {
            setLikes(likes.filter(like => like !== state.user.id))
            await postAPI.removeLike(like)
        }
    }

    return (
        <Card className={styles.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={styles.avatar}>
                        {post.creator.charAt(0)}
                    </Avatar>
                }
                action={
                    state.user.id == post.userID ? <div> 
                        <IconButton aria-label="edit" onClick={handleClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleClick}>
                            <DeleteIcon />
                        </IconButton>
                    </div> : null
                }
                title={post.creator}
                subheader={new Date(post.date).toDateString()}
            />
            {post.mediaURL ? <CardMedia
                className={styles.media}
                src={post.mediaURL}
                title="Paella dish"
            /> : null}
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                {post.message}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <div style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>{likes.length} </div>
                <IconButton aria-label="like" onClick={toggleLike}>
                    {likes.includes(state.user.id) ? <FavoriteIcon htmlColor="red"/> : <FavoriteBorderIcon htmlColor="red"/>}
                </IconButton>
                <div style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>{post.comments.length} </div>
                <IconButton aria-label="comment" onClick={openComments}>
                     <CommentIcon htmlColor="blue"/>
                </IconButton>
                {isOpen && <CommentsPopup
                    comments={post.comments}
                    handleClose={openComments}
                />}
            </CardActions>
    </Card>
    )
}

export default Post;
