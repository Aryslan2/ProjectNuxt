const { Router } = require('express')
const ctr = require('../controllers/product.controller')
const router = Router()
const passport = require('passport')

router.post(
	'/admin/create',
	passport.authenticate('jwt', {session: false}),
	ctr.create
)

router.get(
	'/admin/',
	passport.authenticate('jwt', {session: false}),
	ctr.getAll
)

router.get(
  '/admin/free',
  passport.authenticate('jwt', { session: false }),
  ctr.getFree
);

router.delete(
	'/admin/:id',
	passport.authenticate('jwt', {session: false}),
	ctr.remove
)

router.get(
	'/admin/:id',
	passport.authenticate('jwt', {session: false}),
	ctr.getById
)

router.get(
  '/admin/info/:id', 
  passport.authenticate('jwt', { session: false }),
  ctr.getInfoById 
);

router.put(
	'/admin/:id',
	passport.authenticate('jwt', {session: false}),
	ctr.update
)


router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.get('/info/:id', ctr.getInfoById)

module.exports = router
