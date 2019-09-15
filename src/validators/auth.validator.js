const Joi = require('joi');

module.exports.registerPayload = Joi.object({
  email: Joi.string()
      .required()
      .trim()
      .description('Email Id')
      .error(new Error('INVALID_EMAIL')),
  password: Joi.string()
      .required()
      .trim()
      .description('Password')
      .error(new Error('INVALID_PASSWORD')),
  deviceId: Joi.string()
      .required()
      .trim()
      .description('Device Id')
      .error(new Error('INVALID_DEVICE_ID')),
});

module.exports.loginPayload = Joi.object({
  email: Joi.string()
      .required()
      .trim()
      .description('Email Id')
      .error(new Error('INVALID_EMAIL')),
  password: Joi.string()
      .required()
      .trim()
      .description('Password')
      .error(new Error('INVALID_PASSWORD')),
  deviceId: Joi.string()
      .required()
      .trim()
      .description('Device Id')
      .error(new Error('INVALID_DEVICE_ID')),
});
