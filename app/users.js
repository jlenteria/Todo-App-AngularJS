const db = require('./models')
const encryptor = require('./modules/encryptor.js')
const enc_key = 'adcka0caea6c91563c0ebb852134d34387da0987'
const jwt = require('jsonwebtoken')

exports.register = async (params) => {
  const { models } = await db.getInstance()

  const validUsername = await exports.validateUsername(params.username.trim().toLowerCase())
  if (!validUsername) return {error: "Username is taken."}
  const validEmail = await exports.validateEmail(params.email)
  if(!validEmail)  return {error: "Email is taken."}

  const validPassword = await exports.validatePassword(params.password.trim())
  if (!validPassword) return {error:"Password must be atleast 6 characters."}
  params.password = exports.encryptPassword(params.password.trim())
  return await models.UsersModel.create(params)
}

exports.login = async (params) => {
  const { models } = await db.getInstance()
  const new_username = params.username.trim().toLowerCase()
  let isEmail = false

  if(new_username.includes('@')) isEmail = true
  const where = isEmail ? {email: new_username} : {username : new_username}

  const user = await models.UsersModel.findOne({ where: where })
  if (!user) return {error: "Username or Email is not yet registered."}
  const decrypt_password = encryptor.decrypt(user.password, enc_key)
  if (decrypt_password !== params.password.trim()) return {error: "Password is invalid."}

  const payload = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email
  }

  const user_data = {
    name: user.name,
    username: user.username,
  }
  const access_token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' })

  return { user: user_data, access_token }
}

exports.validateUsername = async (username) => {
  const { models } = await db.getInstance()
  const user = await models.UsersModel.findOne({
    where: { username }
  })
  if (user) return false
  return true
}
exports.validateEmail = async (email) => {
  const { models } = await db.getInstance()
  const user = await models.UsersModel.findOne({
    where: { email }
  })
  if (user) return false
  return true
}

exports.validatePassword = (password) => {
  if (password.length < 6) return false
  return true
}

exports.encryptPassword = (plain) => {
  return encryptor.encrypt(plain, enc_key)
}
