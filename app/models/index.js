const TodosModel = require('./todos.js')
const UsersModel = require('./users.js')
const sequelize = require('../config/sequelize.js')

const model_files = {
  TodosModel,
  UsersModel
}

let db_instance

exports.init = async() => {
  return sequelize.getInstance().then(async (db) => {
    const {Sequelize} = sequelize

    const models = {}
    Object.keys(model_files).forEach(k => {
      models[k] = model_files[k](db, Sequelize)
    })

    models.UsersModel.hasMany(models.TodosModel)
    models.TodosModel.belongsTo(models.UsersModel)

   db_instance = {Sequelize, sequelize, models}
   return db_instance

  }) 
}

exports.getInstance = () => {
  if(db_instance){return Promise.resolve(db_instance)}
  else {return exports.init()}
}