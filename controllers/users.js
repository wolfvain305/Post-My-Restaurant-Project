const User = require('../models/user');


const index = async (req, res) => {
    try {
        const foundUsers = await User.find({})
        res.render('users/index.ejs', {
            users: foundUsers
        })

    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const newFunc = async (req, res) => {
    res.render('users/new.ejs')
}

const destroy = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({_id:  req.params.id})
        deletedUser.posts.forEach((post) => {
            post.deleteOne()
        })
        deletedUser.comments.forEach((comment) => {
            comment.deleteOne()
        })
        res.redirect('/users')
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const update = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id:  req.params.id}, req.body, {new: true})
        res.redirect(`/users/${updatedUser._id}`)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const create = async (req, res) => {
    try {
        const createdUser = await User.create(req.body)
        res.redirect(`/users/${createdUser._id}`)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const edit = async (req,res) => {
    try {
        const foundUser = await User.findOne({_id: req.params.id})
        res.render('users/edit.ejs', {
            user: foundUser
        })
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const show  = async (req,res) => {
    try {
        const foundUser = await User.findOne({_id: req.params.id}).populate('posts comments')
        res.render('users/show.ejs', {
            user: foundUser
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