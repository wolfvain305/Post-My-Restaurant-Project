const { model, SChema, Schema} = require('mongoose')

    const commentSchema = new Schema ({
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
    }, {
        timestamps: true
    })

    const Comment = model('Comment', commentSchema)

    module.exports = Comment
