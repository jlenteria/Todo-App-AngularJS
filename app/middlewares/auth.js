const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) throw new Error('Access denied')

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) throw new Error('Access denied, invalid token.')
    req.user = user;
    next()
  })

}