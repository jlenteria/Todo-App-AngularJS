const user = require('../users.js')

exports.login = async (req, res, next) => {
  try {
    const params = req.body
    const users = await user.login(params)
    res.json(users)
  } catch (e) {
    console.log(e)
    next(e)
  }
}
exports.register = async (req, res, next) => {
  try {
    const params = req.body
    const users = await user.register(params)
    res.json(users)
  } catch (e) {
    console.log(e)
    next(e)
  }
}