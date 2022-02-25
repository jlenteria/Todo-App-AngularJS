const express = require('express')
const router = express.Router()
const auth_ctrl = require('../controller/auth_ctrl.js')
const todos_ctrl = require('../controller/todos_ctrl.js')
const auth = require('../middlewares/auth.js')

router.post('/login', auth_ctrl.login)
router.post('/register', auth_ctrl.register)
router.get('/todos', auth, todos_ctrl.get)
router.post('/todos', auth, todos_ctrl.add)
router.put('/todos/update', auth, todos_ctrl.update)
router.delete('/todos/:id', auth, todos_ctrl.delete)

module.exports = router