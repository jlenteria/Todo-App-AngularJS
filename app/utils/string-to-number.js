'use strict'

module.exports = (str) => {
	if(isNaN(str) || typeof str !== 'string'){return str}
	else {
		const num = parseFloat(str)
		return isNaN(num) ? str : num
	}
}