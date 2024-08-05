const {Schema, model} = require('mongoose')

const branchScheme = new Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},	
	phone: {
		type: Number,
		required: true
	},
	companies: {
		ref: 'companies',
		type: Schema.Types.ObjectId
	}
})

module.exports = model('branches', branchScheme)