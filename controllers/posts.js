const Post = require('../models/post')

const index = async (req, res) => {
    try {
        const foundPosts = await Post.find ({})
        res.render ('post/index', {
            posts: foundPosts
        })
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const newFunc = async (req, res) => {
    try {
        res.render('posts/new')
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const destroy = async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({ _id: req.params.id}).populate('comments')
        deletedPost.comments.forEach(comment => {
            comment.deleteOne()
        })
        res.rediriect('/posts')
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const update = async (req, res) => {
    try {
        const updatePost= await Post.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true})
        res.redirect(`/posts/${updatePost._id}`)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const create = async (req, res) => {
    try {
        req.body.user = req.session.user._id
        const createdPost = await Post.create(req.body)
        res.redirect(`/posts${createdPost._id}`)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const edit = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const show  = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

module.exports = {
    index,
    newFunc,
    destroy,
    update,
    create,
    edit,
    show,
}