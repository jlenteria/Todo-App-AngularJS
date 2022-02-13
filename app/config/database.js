const ini = require('ini')
const fs = require('fs')
const util = require('util')
const path = require('path')
const write_texxt = util.promisify(fs.writeFile)
const chmod = util.promisify(fs.chmod)
const ini_parser = require('../utils/ini-parser.js')
const ini_file = 'database.ini'
console.log(process.env.APPDIR)

const ini_file_path = path.join(process.env.APPDIR, 'config', ini_file)

const fields = [
	'dialect', 'host','port','database','username','password',
	'storage'
]
const string_fields = [
	'host','database','password','storage','dialect','username'
]

const mode = 0o666

function parseFieldTypes (new_config) {
	string_fields.forEach(k => {
		if(new_config[k]){new_config[k] = new_config[k] + ''}
	})
	if(new_config.port && typeof new_config.port === 'string') {new_config.port= parseInt(new_config.port)}
		return new_config
}

exports.read = () => {
	return ini_parser(ini_file).then(parseFieldTypes)
}
exports.save = (data) => {
	return exports.read().then(old_config => {
		let new_config = {}
		fields.forEach(k => {
			const v = data[k]
			if(v) new_config[k] = v
		})

		if(new_config.dialect === 'sqlite' || !data.port){delete new_config.port} else {new_config.port = data.port}

		new_config = parseFieldTypes(new_config)

		return write_texxt(ini_file_path, ini.stringify(new_config), {mode})
			.then(() => chmod(ini_file_path, mode))
			.then(() => new_config)
	})
}
