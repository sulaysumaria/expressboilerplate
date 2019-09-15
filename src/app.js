const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const {PORT} = require('./config');
const connectToDb = require('./helpers/connectToDb.helper');
const extendReq = require('./middlewares/extendReq.middleware');

module.exports.app = express();

require('./models');

// bodyParser should be above methodOverride
this.app.use(bodyParser.json({limit: '100mb'}));
this.app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '100mb',
      parameterLimit: 100000,
    })
);

this.app.use(extendReq);

const router = require('./routes');
this.app.use('/', router);

// delete all headers related to cache
this.app.use((req, res, next) => {
  req.headers['if-none-match'] = '';
  req.headers['if-modified-since'] = '';
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
});

// Compression middleware (should be placed before express.static)
this.app.use(
    compression({
      threshold: 512,
    })
);

// Enabling CORS for all routes.
this.app.use(cors());

// Static files middleware
this.app.use(`/public`, express.static(path.join(__dirname, '..', 'public')));

// for file upload
this.app.use(multer().any());

/**
 * Start server
 */
module.exports.startServer = async () => {
  await connectToDb();

  this.app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
