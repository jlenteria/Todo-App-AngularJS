const todos = require('../todos.js')

exports.get = async (req, res, next) => {
  try {
    const allTodos = await todos.getTodos(req.user.id)
    res.send({ allTodos })

  } catch (e) {
    console.log(e)
    next(e)
  }
}
exports.add = async (req, res, next) => {
  try {
    const params = req.body
    const todo = await todos.postTodo(req.user.id, params)
    res.send({ todo })
  } catch (e) {
    console.log(e)
    next(e)
  }
}
exports.update = async (req, res, next) => {
  try {
    const params = req.body
    const todo = await todos.updateTodo(params, req)
    res.send({ todo })
  } catch (e) {
    console.log(e)
    next(e)
  }
}
exports.delete = async (req, res, next) => {
  try {
    const todo = await todos.deleteTodo(req)
    res.send({ todo })
  } catch (e) {
    console.log(e)
    next(e)
  }
}