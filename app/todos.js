const db = require('./models')

exports.postTodo = async (user_id, params) => {
  const { models } = await db.getInstance()
  params.user_id = user_id
  return await models.TodosModel.create(params)
}

exports.getTodos = async (user_id) => {
  const { models } = await db.getInstance()
  const todos = await models.TodosModel.findAll({
    where: { user_id }
  })

  return todos;
}

exports.updateTodo = async (params, req) => {
  const data = req.body
  const user_id = req.user.id

  const { models } = await db.getInstance()
  const todo = await models.TodosModel.update(data, {
    where: {
      id: data.id,
      user_id
    }
  })
  return todo
}

exports.deleteTodo = async (req) => {
  const todo_id = req.params.id
  const user_id = req.user.id
  const { models } = await db.getInstance()
  return await models.TodosModel.destroy({
    where: {
      id: todo_id,
      user_id: user_id
    }
  })
}