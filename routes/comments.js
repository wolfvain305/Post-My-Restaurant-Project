const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comments')


// Index
router.get('/', commentCtrl.index)
// New
router.get('/new', commentCtrl.newFunc)
// Delete
router.delete('/:id', commentCtrl.destroy)
// Update
router.put('/:id', commentCtrl.update)
// Create
router.post('/', commentCtrl.create)
// Edit
router.get('/:id/edit', commentCtrl.edit)
// Show
router.get('/:id', commentCtrl.show)

module.exports = router