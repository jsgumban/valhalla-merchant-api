const router = require('express').Router();

router.get('/', async (req, res) => {
	try {
		const merchants = await new Merchant().orderBy('-created_at').fetchAll({
			withRelated: ['members'],
		}).catch((err) => {
			throw new ApiError({
				message: err.detail ?? err.message,
			});
		});
		

		const response = MerchantResource.collection(merchants.models).response();
		res.status(200).json(response);
	} catch (err) {
		console.log('err', err);
		res.status(err.status || 403).json(err);
	}
});


router.post('/', async (req, res) => {
	try {
		const merchant = await new Merchant({
			'name': req.body.name,
			'logo': req.body.logo,
		}).save().catch((err) => {
			throw new ApiError({
				message: err.detail ?? err.message,
			});
		});
		
		const response = MerchantResource.make(merchant).response();
		res.status(201).json(response);
	} catch (err) {
		console.log('err', err);
		res.status(err.status || 403).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const merchant = await Merchant.where({
			'id': req.params.id
		}).fetch().catch((err) => {
			throw new ApiError({
				message: err.detail ?? err.message,
			});
		});
		
		await merchant.set(req.body).save();
		res.status(200).json();
	} catch (err) {
		console.log('err-', err);
		res.status(err.status || 403).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const merchant = await Merchant.where({
			'id': req.params.id
		}).fetch().catch((err) => {
			throw new ApiError({
				message: err.detail ?? err.message,
			});
		});
		
		await merchant.destroy();
		res.status(200).json();
	} catch (err) {
		console.log('err-', err);
		res.status(err.status || 403).json(err);
	}
});

module.exports = router;
