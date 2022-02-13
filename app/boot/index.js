const db = require('../config/sequelize.js')
const dbb = require('../models')

exports.init = async() => {
	db.verify()
}