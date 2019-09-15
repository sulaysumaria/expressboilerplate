const {Router} = require('express');
const router = new Router();

router.get('/', async (req, res) => {
  return res.send({status: 'ok'});
});

router.use('/auth', require('./auth.routes'));

module.exports = router;
