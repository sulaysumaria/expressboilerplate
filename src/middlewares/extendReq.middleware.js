const _ = require('lodash');

module.exports = (req, res, next) => {
  req.allParams = () => _.merge(req.params, req.query, req.body);

  res.ok = (resPayload) => {
    if (typeof resPayload === 'string') {
      return res.send({statusCode: 200, message: resPayload});
    }

    return res.send({statusCode: 200, ...resPayload});
  };

  res.badRequest = (resPayload) => {
    if (typeof resPayload === 'string') {
      return res
          .status(400)
          .send({statusCode: 400, error: resPayload, message: resPayload});
    }

    const {statusCode = 400, message = 'BAD_REQUEST'} = resPayload;

    return res.status(statusCode).send({statusCode, message, error: message});
  };

  res.internalServerError = (e) => {
    console.log(e);

    return res
        .status(500)
        .send({statusCode: 500, message: 'SOME_ERROR_OCCURRED'});
  };

  next();
};
