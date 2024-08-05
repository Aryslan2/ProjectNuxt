const Company = require('../models/company.model')

module.exports.create = async (req, res) => {
	try {
		const {name, text, bin, kato, address, director, email, phone} = req.body
		const company = new Company({name, text, bin, kato, address, director, email, phone})

		await company.save()
		
		res.status(201).json(company)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req, res) => {
	try {
		const companies = await Company.find().sort({date: -1})
		res.json(companies)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const company = await Company.findById(req.params.id).exec()

		if (!company) {
			return res.status(404).json({ message: 'Company not found' })
		}

		res.json(company)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.update = async (req, res) => {
	const $set = {
		name: req.body.name,
		text: req.body.text,
		bin: req.body.bin,
		kato: req.body.kato,
		address: req.body.address,
		director: req.body.director,
		email: req.body.email,
		phone: req.body.phone
	}
	try {
		const company = await Company.findOneAndUpdate({
			_id: req.params.id
		}, {$set}, {new: true})
		res.json(company)
	} catch (e) {
		res.status(500).json(e)
	}
}
