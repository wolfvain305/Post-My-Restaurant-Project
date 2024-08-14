const { model, Schema} = require('mongoose')

const postSchema = new Schema({
    title:{type: String, required: true },
    content: String,
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
})

const Post = model('Post', postSchema)

module.exports = Post