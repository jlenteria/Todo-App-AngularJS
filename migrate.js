const {exec} = require('child_process')
const path = require('path')
const ini = require('ini')
const fs = require('fs')
const ini_file = 'database.ini'
const default_database_ini = path.join(process.env.APPDIR, 'config/defaults', ini_file)
const database_ini = path.join(process.env.APPDIR, 'config',ini_file)
const db_dir = path.join(process.env.APPDIR, 'db')
const db_config_json = path.join(db_dir, 'config.json')

const migrate = async () => {
	const exists = fs.existsSync(db_dir)
	if(!exists) await fs.promises.mkdir(db_dir, {force: true})
	const user_config_str = await fs.promises.readFile(database_ini, 'utf8').catch(e => '')
	const default_config = ini.parse(await fs.promises.readFile(default_database_ini, 'utf8'))
	const user_config = ini.parse(user_config_str)	

	const cfg = user_config_str ? user_config : default_config
	const db_config = {development: cfg, production: cfg}
	await fs.promises.writeFile(db_config_json, JSON.stringify(db_config))


	await new Promise((resolve,reject) => {
		const proc = exec(
			'sequelize db:migrate',
			err => (err ? reject(err) : resolve())
			)
		proc.stdout.pipe(process.stdout)
		proc.stderr.pipe(process.stderr)
	})
}

module.exports = migrate()