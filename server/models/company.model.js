const {Schema, model} = require('mongoose')

const companyScheme = new Schema({
	name: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	bin: {
		type: Number,
		required: true
	},
	kato: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	director: {
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

module.exports = model('companies',companyScheme)