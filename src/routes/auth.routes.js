const {Router} = require('express');
const router = new Router();

const requestValidator = require('../middlewares/requestValidator.middleware');

const controller = require('./../controllers/auth.controller');
const validator = require('./../validators/auth.validator');

router.post('/register', requestValidator(validator.registerPayload), controller.register);

router.post('/login', requestValidator(validator.loginPayload), controller.login);

module.exports = router;
