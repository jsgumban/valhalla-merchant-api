const router = require('express').Router();
const auth = require('./auth');
const merchants = require('./merchants');
const members = require('./members');
const authorizedUser = require('./middlewares/authorized-user');
const authorizedClient = require('./middlewares/authorized-client');

router.use('/auth', authorizedClient, auth);
router.use('/merchants', authorizedUser, merchants);
router.use('/members', authorizedUser, members);

module.exports = router;
