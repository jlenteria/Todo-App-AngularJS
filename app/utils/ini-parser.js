const ini = require('ini')
const path = require('path')
const fs = require('fs')
const util = require('util')

const read_file = util.promisify(fs.readFile)
const str_to_num = require('./string-to-number.js')
exports._DIRNAME = path.join(__dirname, '/../../')

function readDefaults(file,opts){
	const root_dir = opts.root_dir || exports._DIRNAME
	const defaults_path = path.join(root_dir, 'config', 'defaults')
	const default_config_path = path.join(defaults_path, file)

	return read_file(default_config_path, 'utf8').then(txt => {
		const default_config = ini.decode(txt)
		return default_config
	})
}

function readUserConfig (file, opts) {
  const root_dir = opts.root_dir || exports._DIRNAME
  const user_ini_path = path.join(root_dir, 'config', file)
  return read_file(user_ini_path, 'utf8')
    .then(txt => {
      return ini.decode(txt)
    })
    .catch(e => {
      return false
    })
}

module.exports = (ini_file, opts) => {
	opts = opts || {}
	opts.merge = typeof opts.merge === 'boolean' ? opts.merge:  true
	const root_dir = opts.root_dir || exports._DIRNAME
	return readDefaults(ini_file, {root_dir}).then(default_config => {
		return readUserConfig(ini_file, {root_dir}).then(user_config => {
			const cfg = opts.merge && user_config 
				? Object.assign(default_config, user_config)
				: user_config || default_config 

			Object.keys(cfg).forEach(k => {
				cfg[k] = typeof cfg[k] === 'string' ? str_to_num(cfg[k]) : cfg[k]
			})
			return cfg
		})
	})
}