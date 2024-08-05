const {Schema, model} = require('mongoose')

const managementScheme = new Schema({
	products: {
		ref: 'products',
		type: Schema.Types.ObjectId
	},
	statuses: {
		ref: 'statuses',
		type: Schema.Types.ObjectId
	},
	persons: {
		ref: 'persons',
		type: Schema.Types.ObjectId
	},
	date: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		required: false
	},
	issue: {
		type: String,
		required: false
	},
})

module.exports = model('managements', managementScheme)