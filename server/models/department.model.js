const {Schema, model} = require('mongoose')

const departmentScheme = new Schema({
	name: {
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
	branches: {
		ref: 'branches',
		type: Schema.Types.ObjectId
	}
})

module.exports = model('departments', departmentScheme)