const Person = require('../models/person.model')

module.exports.create = async (req, res) => {
	try {
		const {first_name, last_name, department} = req.body
		const person = new Person({first_name, last_name, departments: department})

		await person.save()
		
		res.status(201).json(person)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req, res) => {
	try {
		const persons = await Person.find().populate('departments', 'name').sort({date: -1})
		res.json(persons)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.remove = async (req, res) => {
	try {
		await Person.deleteOne({_id: req.params.id})
		res.json({message: 'Person deleted'})
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const person = await Person.findById(req.params.id).exec()

		if (!person) {
			return res.status(404).json({ message: 'Person not found' })
		}

		res.json(person)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.update = async (req, res) => {
	const $set = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		departments: req.body.departments 
	}
	try {
		const person = await Person.findOneAndUpdate({
			_id: req.params.id
		}, {$set}, {new: true})
		res.json(person)
	} catch (e) {
		res.status(500).json(e)
	}
}



