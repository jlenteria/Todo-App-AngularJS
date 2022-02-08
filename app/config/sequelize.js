const Sequelize = require('sequelize')
const db_config = require('./database.js')
let promise

function buildSequelize(cfg) {
	if(cfg.dialect !== 'sqlite'){
		return new Sequelize(cfg.database, cfg.username, cfg.password, {
			host: cfg.host,
			port: cfg.port,
			pool: {
				min: 1,
				max: 15,
				acquire: 20000,
				idle: 10000
			},
			dialect: cfg.dialect
		})
	}else{
		return new Sequelize({
			dialect: cfg.dialect,
			storage: cfg.storage
		})
	}
}

exports._instance = null
exports.Sequelize = Sequelize

exports.init = async () => {

	let db_cfg = await db_config.read()
	exports._instance = buildSequelize(db_cfg)

	return exports._instance
}

exports.getInstance = () => {
	return !exports._instance ? exports.init() : Promise.resolve(exports._instance)
}

exports.test = (cfg) => {
	return buildSequelize(cfg).authenticate()
}

exports.verify = () => {
	const auth_loop = () => {
		return exports.init().then(db => {
			return db.authenticate()
				.then(res => {
					console.log('db:connected')
				})
				.catch(e => {
					console.log(e)
					return new Promise(resolve => {
						setTimeout(() => resolve(auth_loop()),3000)
					})
				})
		})
	}

	if(promise) {return promise}
	
	promise = auth_loop()
	return promise
}