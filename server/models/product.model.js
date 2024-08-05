const {Schema, model} = require('mongoose')

const productScheme = new Schema({
	name: {
		type: String,
		required: true
	},
	characteristic: {
		type: String,
		required: true
	},
	barcode: {
		type: Number,
		default: 0
	},
	isBusy: {
    type: Boolean,
    default: false 
  }
})

module.exports = model('products', productScheme)