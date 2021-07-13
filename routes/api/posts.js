const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Models
const Post = require('../../models/post')
const Comment = require('../../models/comment')

// POST create a new post
router.post('/create', auth, (req, res) => {
    const newPost = new Post({
        courseID: req.body.courseID,
        userID: req.body.userID,
        creator: req.body.creator,
        message: req.body.message,
        mediaURL: req.body.mediaURL,
    })
    
    newPost.save().then(post => res.status(200).json({
        status: 'success',
        msg: 'Post created successfully',
        post: post,
    })).catch(() => res.status(400).json({
        status: 'failure',
        msg: 'Post creation failed',
    }))
})

// PUT update post's message
router.put('/:id', auth, (req, res) => {
    const newMessage = { message: req.body.message }

    Post.findOneAndUpdate({ postID: req.params.id }, newMessage)
        .then(post => res.status(200).json({
            status: 'Success',
            msg: 'Post updated successfully',
            code: post.postID,
        })).catch((err) => res.status(400).json({
            status: 'Failure',
            msg: 'Post update failed' + err,
        }))
})

// GET posts by courseID
router.get('/course/:id', auth, (req, res) => {
    let limit = parseInt(req.query.limit) || 10
    let page = (Math.abs(req.query.page) || 1) - 1;
    var postsArr = []

    Post.find({
        courseID: req.params.id,
    })
    .limit(limit)
    .skip(limit * page)
    .then(posts => {
        const mapping = posts.map(async (post) => {
            const commentIDs = post.comments
            const likerIDs = post.likes
            const creator = await User.findById(post.userID).then((user) => user.name)
            const comments = await Comment.find({}).where('commentID').in(commentIDs).then((comments) => comments)

            postsArr.push({
                postID: post.postID,
                userID: post.userID,
                creator: creator,
                createdAt: post.createdAt,
                message: post.message,
                mediaURL: post.mediaURL,
                likes: likerIDs,
                comments: comments
            })
        })
        return Promise.all(mapping).then(() => {
            res.status(200).json({
                posts: postsArr,
                status: 'Success!',
                message: 'Fetched posts'
            })
        });
    })
    .catch((err) => res.status(400).json({
        status: 'Failure!',
        message: 'Unable to retrieve posts' + err
    }))
})


// DELETE post by postID
router.delete("/:id", auth, (req, res) => {
    Post.findOneAndDelete({ postID: req.params.id })
        .then((post) => res.status(200).json({
            status: 'Success!',
            message: 'Deleted post'
        }))
        .catch((err) => res.status(400).json({
            status: 'Failure!',
            message: 'Unable to find post'
        }))
});

// POST add a new like
router.post('/likes/add', (req, res) => {
    Post.updateOne({ postID: req.body.postID }, { $addToSet: { likes: req.body.likerID } })
        .then((post) => res.status(200).json({
            status: 'Success!',
            msg: 'Like added!',
            likes: post.likes
        }))
        .catch(() => res.status(400).json({
            status: 'Failure',
            msg: 'Like failed',
        }))
})

// POST remove a like
router.post('/likes/remove', (req, res) => {
    Post.updateOne({ postID: req.body.postID }, { $pull: { likes: req.body.likerID } })
        .then((post) => res.status(200).json({
            status: 'Success!',
            msg: 'Like removed!',
            likes: post.likes
        }))
        .catch(() => res.status(400).json({
            status: 'Failure',
            msg: 'Like removal failed',
        }))
})

// GET likes by postID
router.get('/likes/:id', auth, (req, res) => {    
    Post.find({
        postID: req.params.postID,
    })
    .then(post => res.status(200).json({
        likes: post.likes,
        status: 'Success!',
        message: 'Likes retrieved!'
    }))
    .catch((err) => res.status(400).json({
        status: 'Failure!',
        message: 'Unable to retrieve likes'
    }))
})

// POST create a new comment 
router.post('/comments/create', auth, (req, res) => {
    const newComment = new Comment({
        postID: req.body.postID,
        author: req.body.author,
        message: req.body.message
    })

    newComment.save().then(async (comment) => {
        await Post.updateOne({ postID: req.body.postID }, { $addToSet: { comments: comment.commentID } })
        res.status(200).json({
            status: 'Success',
            msg: 'Comment created successfully',
            comment: comment,
        })
    }).catch(() => res.status(400).json({
        status: 'Failure',
        msg: 'Comment creation failed',
    }))
})

// GET comments by postID
router.get('/comments/:id', auth, (req, res) => {
    let limit = parseInt(req.query.limit) || 10
    let page = (Math.abs(req.query.page) || 1) - 1;
    
    Comment.find({
        postID: req.params.id,
    })
    .limit(limit)
    .skip(limit * page)
    .then(comments => res.status(200).json({
        comments: comments,
        status: 'Success!',
        message: 'Comments retrieved!'
    }))
    .catch((err) => res.status(400).json({
        status: 'Failure!',
        message: 'Unable to retrieve comments'
    }))
})

// DELETE comment by commentID
router.delete("/comments/:id", auth, async (req, res) => {
    await Post.updateOne({ postID: req.body.postID }, { $pull: { comments: req.params.id } })
    Comment.findOneAndDelete({ commentID: req.params.id })
        .then((comment) => res.status(200).json({
            status: 'Success!',
            message: 'Deleted comment'
        }))
        .catch((err) => res.status(400).json({
            status: 'Failure!',
            message: 'Unable to find comment'
        }))
});

module.exports = router