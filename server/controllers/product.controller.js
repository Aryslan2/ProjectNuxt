const Product = require('../models/product.model')

module.exports.create = async (req, res) => {
	try {
		const {name, characteristic, barcode} = req.body
		const product = new Product({name, characteristic, barcode})

		await product.save()
		
		res.status(201).json(product)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req, res) => {
	try {
			const products = await Product.find().sort({date: -1});
			res.json(products);
	} catch (e) {
			res.status(500).json(e);
	}
}

module.exports.getFree = async (req, res) => {
  try {
    const busyProducts = await Product.find({ isBusy: true });
    const busyProductIds = busyProducts.map(product => product._id);
    const freeProducts = await Product.find({ _id: { $nin: busyProductIds } }).sort({ date: -1 });
    res.json(freeProducts);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.remove = async (req, res) => {
	try {
		await Product.deleteOne({_id: req.params.id})
		res.json({message: 'Product deleted'})
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).exec()

		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}

		res.json(product)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getInfoById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.update = async (req, res) => {
	const $set = {
		name: req.body.name,
		characteristic: req.body.characteristic,
		barcode: req.body.barcode
	}
	try {
		const product = await Product.findOneAndUpdate({
			_id: req.params.id
		}, {$set}, {new: true})
		res.json(product)
	} catch (e) {
		res.status(500).json(e)
	}
}



