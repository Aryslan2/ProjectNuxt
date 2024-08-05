const Branch = require('../models/branch.model')

module.exports.create = async (req, res) => {
	try {
		const {name, address, phone, email, company} = req.body
		const branch = new Branch({name, address, phone, email, companies: company})

		await branch.save()
		
		res.status(201).json(branch)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req, res) => {
	try {
		const branches = await Branch.find().populate('companies', 'name').sort({date: -1});
		res.json(branches);
	} catch (e) {
		res.status(500).json(e);
	}
}

module.exports.remove = async (req, res) => {
	try {
		await Branch.deleteOne({_id: req.params.id})
		res.json({message: 'Branch deleted'})
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const branch = await Branch.findById(req.params.id).exec()

		if (!branch) {
			return res.status(404).json({ message: 'Branch not found' })
		}

		res.json(branch)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.update = async (req, res) => {
	const $set = {
		name: req.body.name,
		address: req.body.address,
		email: req.body.email,
		phone: req.body.phone
	}
	try {
		const branch = await Branch.findOneAndUpdate({
			_id: req.params.id
		}, {$set}, {new: true})
		res.json(branch)
	} catch (e) {
		res.status(500).json(e)
	}
}

