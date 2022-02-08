const db = require('../config/sequelize.js')

exports.init = () => {
	db.verify()
}