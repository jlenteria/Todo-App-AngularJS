const db = require('./models')
const encryptor = require('./modules/encryptor.js')
const enc_key = 'adcka0caea6c91563c0ebb852134d34387da0987'

exports.register = async(params) => {
  const {models} = await db.getInstance()
  const validUsername = await exports.validateUsername(params.username.trim().toLowerCase())
  if(!validUsername) throw new Error("Username is taken.")
  const validPassword = await exports.validatePassword(params.password.trim())
  if(!validPassword) throw new Error("Password must be atleast 6 characters.")
  params.password = exports.encryptPassword(params.password.trim())
  return await models.UsersModel.create(params)
}

exports.login = async(params) => {
  const {models} = await db.getInstance()
  const new_username = params.username.trim().toLowerCase()
  const user = await models.UsersModel.findOne({where: {username: new_username}})
  if(!user) throw new Error ("Username is not yet registered.")
  const decrypt_password = encryptor.decrypt(user.password, enc_key)
  if(decrypt_password !== params.password.trim()) throw new Error("Password is invalid.")
  
  return user
}

exports.validateUsername = async (username) => {
  const {models} = await db.getInstance()
  const user = await models.UsersModel.findOne({
    where: {username}
  })
  if(user) return false
  return true
}
exports.validatePassword = (password) => {
  if(password.length < 6) return false
  return true 
}

exports.encryptPassword = (plain) => {
  return encryptor.encrypt(plain, enc_key)
}
