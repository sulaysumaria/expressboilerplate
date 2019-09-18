const _ = require('lodash');

module.exports = (req, res, next) => {
  req.allParams = () => _.merge(req.params, req.query, req.body);

  res.ok = (resPayload) => {
    if (typeof resPayload === 'string') {
      return res.send({statusCode: 200, message: res.__(resPayload)});
    }

    return res.send({statusCode: 200, ...resPayload});
  };

  res.error = (resPayload) => {
    if (typeof resPayload === 'string') {
      return res.status(400).send({statusCode: 400, error: resPayload, message: resPayload});
    }

    const {statusCode = 400, message = 'BAD_REQUEST'} = resPayload;

    return res.status(statusCode).send({statusCode, message, error: res.__(message)});
  };

  res.internalServerError = (e) => {
    console.log(e);

    return res.status(500).send({statusCode: 500, message: res.__('SOME_ERROR_OCCURRED')});
  };

  next();
};
