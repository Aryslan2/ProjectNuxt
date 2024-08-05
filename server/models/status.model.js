const {Schema, model} = require('mongoose')

const statusScheme = new Schema({
	name: {
		type: String,
		required: true
	},
})

module.exports = model('statuses', statusScheme)