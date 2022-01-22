const ApiError = require("../../src/services/ApiError");
const router = require('express').Router();

router.post('/', async (req, res) => {
	try {
		const member = await new Member(req.body).save().catch((err) => {
			if (err.code == 'ER_DUP_ENTRY') {
				err.message = 'Email has already been used'
			}
			throw new ApiError({
				message: err.detail ?? err.message,
			});
		});
		
		const response = MemberResource.make(member).response();
		res.status(201).json(response);
	} catch (err) {
		console.log('err', err);
		res.status(err.status || 403).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const member = await Member.where({
			id: req.params.id
		}).fetch().catch((err) => {
			throw new ApiError({
				message: err.detail ?? err.message,
			});
		});
		
		await member.set({
			name: req.body.name,
			email: req.body.email,
			merchant_id: req.body.merchant_id
		}).save();
		
		res.status(200).json();
	} catch (err) {
		console.log('err', err);
		res.status(err.status || 403).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const member = await Member.where({
			'id': req.params.id
		}).fetch().catch((err) => {
			throw new ApiError({
				message: err.detail ?? err.message,
			});
		});
		
		await member.destroy();
		res.status(200).json();
	} catch (err) {
		console.log('err-', err);
		res.status(err.status || 403).json(err);
	}
});

module.exports = router;
