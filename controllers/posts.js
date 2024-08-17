const Post = require('../models/post')
const User = require('../models/user')

const index = async (req, res) => {
    try {
        const foundPosts = await Post.find ({})
        res.render ('posts/index.ejs', {
            posts: foundPosts
        })
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const newFunc = async (req, res) => {
    try {
        res.render('posts/new.ejs')
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const destroy = async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({ _id: req.params.id }).populate('comments')
        deletedPost.comments.forEach(comment => {
            comment.deleteOne()
        })
        res.redirect('/posts')
    } catch (error) {
        res.status(400).json({ msg: error.message })
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
        req.body.user = req.session.account._id
        const foundUser = await User.findOne({_id: req.session.account._id})
        const createdPost = await Post.create(req.body)
        foundUser.posts.addToSet(createdPost)
        await foundUser.save()
        res.redirect(`/posts/${createdPost._id}`)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const edit = async (req,res) => {
    try {
        const foundPost = await Post.findOne({_id: req.params.id})
        res.render('posts/edit.ejs', {
            post: foundPost
        })
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const show = async (req,res) => {
    try {
        const foundPost = await Post.findOne({_id: req.params.id}).populate('comments')
        res.render('posts/show.ejs', {
            post: foundPost
        })
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