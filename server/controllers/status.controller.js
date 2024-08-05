const Status = require('../models/status.model')

module.exports.create = async (req, res) => {
	try {
		const {name} = req.body
		const status = new Status({name})

		await status.save()
		
		res.status(201).json(status)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req, res) => {
	try {
		const statuses = await Status.find().sort({date: -1})
		res.json(statuses)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.remove = async (req, res) => {
	try {
		await Status.deleteOne({_id: req.params.id})
		res.json({message: 'Status deleted'})
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const status = await Status.findById(req.params.id).exec()

		if (!status) {
			return res.status(404).json({ message: 'This status not found' })
		}

		res.json(status)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.update = async (req, res) => {
	const $set = {
		name: req.body.name
	}
	try {
		const status = await Status.findOneAndUpdate({
			_id: req.params.id
		}, {$set}, {new: true})
		res.json(status)
	} catch (e) {
		res.status(500).json(e)
	}
}



