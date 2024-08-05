const Department = require('../models/department.model')

module.exports.create = async (req, res) => {
	try {
		const {name, phone, email, branch} = req.body
		const department = new Department({name, phone, email, branches: branch})

		await department.save()
		
		res.status(201).json(department)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req, res) => {
	try {
		const departments = await Department.find().populate('branches', 'name').sort({date: -1})
		res.json(departments)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.remove = async (req, res) => {
	try {
		await Department.deleteOne({_id: req.params.id})
		res.json({message: 'Department deleted'})
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const department = await Department.findById(req.params.id).exec()

		if (!department) {
			return res.status(404).json({ message: 'Department not found' })
		}

		res.json(department)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.update = async (req, res) => {
	const $set = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		branches: req.body.branches
	}
	try {
		const department = await Department.findOneAndUpdate({
			_id: req.params.id
		}, {$set}, {new: true})
		res.json(department)
	} catch (e) {
		res.status(500).json(e)
	}
}



