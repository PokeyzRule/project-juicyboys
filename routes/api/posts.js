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
        message: req.body.message,
        mediaURL: req.body.mediaURL,
      })
    
    newPost.save().then(post => res.status(200).json({
        status: 'success',
        msg: 'Post created successfully',
        code: post.postID,
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

    Post.find({
        courseID: req.params.id,
    })
    .limit(limit)
    .skip(limit * page)
    .then(posts => res.status(200).json({
        posts: posts,
        status: 'Success!',
        message: 'Posts retrieved!'
    }))
    .catch((err) => res.status(400).json({
        status: 'Failure!',
        message: 'Unable to retrieve posts'
    }))
})

// GET posts by userID
router.get('/user/:id', auth, (req, res) => {
    let limit = parseInt(req.query.limit) || 10
    let page = (Math.abs(req.query.page) || 1) - 1;

    Post.find({
        userID: req.params.id,
    })
    .limit(limit)
    .skip(limit * page)
    .then(posts => res.status(200).json({
        posts: posts,
        status: 'Success!',
        message: 'Posts retrieved!'
    }))
    .catch((err) => res.status(400).json({
        status: 'Failure!',
        message: 'Unable to retrieve posts'
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

// POST create a new comment 
router.post('/comments/create', auth, (req, res) => {
    const newComment = new Comment({
        postID: req.body.postID,
        userID: req.body.userID,
        message: req.body.message
    })

    newComment.save().then(comment => res.status(200).json({
        status: 'Success',
        msg: 'Comment created successfully',
        code: comment.commentID,
    })).catch(() => res.status(400).json({
        status: 'Failure',
        msg: 'Comment creation failed',
    }))
})

// PUT update comment message
router.put('/comments/:id', auth, (req, res) => {
    const newMessage = { message: req.body.message }

    Comment.findOneAndUpdate({ commentID: req.params.id }, newMessage)
        .then(comment => res.status(200).json({
            status: 'Success',
            msg: 'Comment updated successfully',
            code: comment.commentID,
        })).catch((err) => res.status(400).json({
            status: 'Failure',
            msg: 'Comment update failed' + err,
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
router.delete("/comments/:id", auth, (req, res) => {
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