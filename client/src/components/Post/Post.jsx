import React, { useContext, useState } from 'react'
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
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Post.module.scss'
import CommentsPopup from '../CommentsPopup/CommentsPopup';
import postAPI from '../../api/postAPI';

function Post({ post, setPosts }) {
    
    const { state } = useContext(AuthContext)
    const user = JSON.parse(state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);

    const toggleComments = () => setIsOpen(!isOpen);

    const toggleLike = async () => {
        const like = {
            postID: post.postID,
            likerID: user.id
        };
        if (!likes.includes(user.id)) {
            setLikes([...likes, user.id])
            await postAPI.addLike(like)
        } else {
            setLikes(likes.filter(like => like !== user.id))
            await postAPI.removeLike(like)
        }
    }

    const deletePost = async (id) => {
        await postAPI.deletePost(id);
        setPosts(posts => posts.filter(post => post.postID !== id))
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
                    user.id === post.userID ? <div> 
                        <IconButton aria-label="delete" onClick={() => deletePost(post.postID)}>
                            <DeleteIcon />
                        </IconButton>
                    </div> : null
                }
                title={post.creator}
                subheader={new Date(post.createdAt).toDateString()}
            />
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                {post.message}
                </Typography>
            </CardContent>
            {post.mediaURL ? <CardMedia> 
                <img className={styles.media} src={post.mediaURL} alt="postMedia"/> 
            </CardMedia> : null}
            <CardActions disableSpacing>
                <div className={styles.values}>{likes.length} </div>
                <IconButton aria-label="like" onClick={toggleLike}>
                    {likes.includes(user.id) ? <FavoriteIcon htmlColor="red"/> : <FavoriteBorderIcon htmlColor="red"/>}
                </IconButton>
                <div className={styles.values}>{comments.length} </div>
                <IconButton aria-label="comment" onClick={toggleComments}>
                     <CommentIcon htmlColor="blue"/>
                </IconButton>
                {isOpen && <CommentsPopup
                    post={post}
                    author={user.name}
                    comments={comments}
                    setComments={setComments}
                    handleClose={toggleComments}
                />}
            </CardActions>
    </Card>
    )
}

export default Post;
