const express = require('express')
const router = express.Router()
const auth_ctrl = require('../controller/auth_ctrl.js')
const todos_ctrl = require('../controller/todos_ctrl.js')


router.post('/login', auth_ctrl.login)
router.post('/register', auth_ctrl.register)
router.get('/todos', todos_ctrl.get)
router.post('/todos', todos_ctrl.add)
router.put('/todos:id', todos_ctrl.update)
router.delete('/todos:id', todos_ctrl.delete)

module.exports = router