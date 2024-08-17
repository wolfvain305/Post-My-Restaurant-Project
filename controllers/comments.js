const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

const create = async (req, res) => {
    try {
        req.body.user = req.session.account._id
        req.body.post = req.params.postId
        const comment = await Comment.create(req.body)
        const user = await User.findOne({ _id: req.session.account._id })
        const post = await Post.findOne({ _id: req.params.postId })    
        post.comments.addToSet(comment)
        user.comments.addToSet(comment)
        await post.save()
        await comment.save()
        res.redirect(`/posts/${req.params.postId}`)
    
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports = {
    create
}