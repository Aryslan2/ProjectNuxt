const {Schema, model} = require('mongoose')

const personScheme = new Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	departments: {
		ref: 'departments',
		type: Schema.Types.ObjectId
	},
	products: {
		ref: 'products',
		type: Schema.Types.ObjectId
	}
})

module.exports = model('persons', personScheme)