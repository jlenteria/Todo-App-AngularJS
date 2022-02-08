const ini = require('ini')
const fs = require('fs')
const util = require('util')
const path = require('path')
const write_texxt = util.promisify(fs.writeFile)
const chmod = util.promisify(fs.chmod)
const ini_parser = require('../utils/ini-parser.js')
const ini_file = 'database.ini'
// const ini_file_path = path.join(process.env.APPDIR, 'config', ini_file)
const fields = [
	'dialect', 'host','port','database','username','password',
	'storage'
]
const string_fields = [
	'host','database','password','storage','dialect','username'
]

const enc_key = 'ab0ba0caea6c98563c5ebb852234d34387da3735'
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
