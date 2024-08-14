const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')


// Index
router.get('/', userCtrl.index)
// New
router.get('/new', userCtrl.newFunc)
// Delete
router.delete('/:id', userCtrl.destroy)
// Update
router.put('/:id', userCtrl.update)
// Create
router.post('/', userCtrl.create)
// Edit
router.get('/:id/edit', userCtrl.edit)
// Show
router.get('/:id', userCtrl.show)

module.exports = router