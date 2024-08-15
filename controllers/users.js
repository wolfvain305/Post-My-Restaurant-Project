const User = require('../models/user')
const bcrypt = require('bcrypt')



const signUp = async(req, res) => {
    try {
        const emailTaken = await User.findOne({ email: req.body.email})
        if(emailTaken) return res.send('Email is already in use')
        
        const hashedPassword =  bcrypt.hashedSync(req.body.password, 10)
        req.body.password = hashedPassword
        await User.create(req.body).then(() => res.redirect('/sign-in'))
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}


const signIn = async(req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email})
        if(userExists) throw new Error('User Not Found')

        const validPassword = bcrypt.compareSync(req.body.password, userExists.password)
        if(!validPassword) throw new Error('Login Failed')

        req.session.account = {
            email: userExists.email,
            _id: userExists._id
        }

        res.redirect('/posts')
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

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

const showSignIn = async (req, res) => {
    res.render('users/signin.ejs')
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

// const create = async (req, res) => {
//     try {
//         const createdUser = await User.create(req.body)
//         res.redirect(`/users/${createdUser._id}`)
//     } catch (error) {
//         res.status(400).json({msg:error.message})
//     }
// }

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
    signIn,
    signUp,
    showSignIn,
    edit,
    show,
}