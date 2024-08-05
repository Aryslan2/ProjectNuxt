const Management = require('../models/management.model')
const Product = require('../models/product.model')


module.exports.create = async (req, res) => {
	try {
		const {person, product, status, description, issue} = req.body
		const management = new Management({persons: person, products: product, statuses: status, description, issue})

		await management.save()

		await Product.findByIdAndUpdate(product, { isBusy: true });
		
		res.status(201).json(management)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAll = async (req, res) => {
	try {
			const management = await Management.find()
			.populate({
        path: 'persons',
        select: 'first_name last_name',
        populate: {
          path: 'departments',
          select: 'name',
          populate: {
            path: 'branches',
            select: 'name'
          }
        }
      })
			.populate('products', 'name')
			.populate('statuses', 'name')
			.sort({date: -1});
			res.json(management);
	} catch (e) {
			res.status(500).json(e);
	}
}

module.exports.remove = async (req, res) => {
  try {
    const management = await Management.findById(req.params.id);
    if (!management) {
      return res.status(404).json({ message: 'Not found' });
    }

    const productId = management.products;

    await Management.deleteOne({ _id: req.params.id });

    await Product.findByIdAndUpdate(productId, { isBusy: false });

    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getById = async (req, res) => {
	try {
		const management = await Management.findById(req.params.id).exec()

		if (!management) {
			return res.status(404).json({ message: 'Not found' })
		}

		res.json(management)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getInfoById = async (req, res) => {
  try {
    const management = await Management.findById(req.params.id)
		.populate({
			path: 'persons',
			select: 'first_name last_name',
			populate: {
				path: 'departments',
				select: 'name',
				populate: {
					path: 'branches',
					select: 'name'
				}
			}
		})
		.populate('products', 'name barcode')
		.populate('statuses', 'name')
		.exec();

    if (!management) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(management);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const management = await Management.findById(req.params.id);
    if (!management) {
      return res.status(404).json({ message: 'Management not found' });
    }

    const prevProductId = management.products;
    const newProductId = req.body.products;

    if (prevProductId && prevProductId.toString() !== newProductId) {
      await Product.findByIdAndUpdate(prevProductId, { isBusy: false });
    }

    await Product.findByIdAndUpdate(newProductId, { isBusy: true });

    const updatedManagement = await Management.findByIdAndUpdate(
      req.params.id,
      {
        products: newProductId,
        persons: req.body.persons,
        statuses: req.body.statuses,
        description: req.body.description,
        issue: req.body.issue
      },
      { new: true }
    );

    res.json(updatedManagement);
  } catch (e) {
    res.status(500).json(e);
  }
};



