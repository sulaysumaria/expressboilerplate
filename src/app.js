const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const i18n = require('i18n');
const morgan = require('morgan');

const {PORT} = require('./config');
const connectToDb = require('./helpers/connectToDb.helper');
const extendReq = require('./middlewares/extendReq.middleware');

module.exports.app = express();

require('./models');

this.app.use(morgan('tiny'));

// body-parser needed to parse form-data bodies
this.app.use(bodyParser.json({limit: '100mb'}));
this.app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '100mb',
      parameterLimit: 100000,
    })
);

// i18n
i18n.configure({
  locales: ['en', 'de'],
  directory: __dirname + '/locales',
});

this.app.use(i18n.init);

// extend req and res
this.app.use(extendReq);

// load routes
const router = require('./routes');
this.app.use('/', router);

// delete all headers related to cache
this.app.use((req, res, next) => {
  req.headers['if-none-match'] = '';
  req.headers['if-modified-since'] = '';
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
});

// compression responses
this.app.use(compression({threshold: 512}));

// enabling CORS for all routes.
this.app.use(cors());

// static files middleware
this.app.use(`/public`, express.static(path.join(__dirname, '..', 'public')));

// multer for file upload
this.app.use(multer().any());

/**
 * Start server
 */
module.exports.startServer = async () => {
  await connectToDb();

  this.app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

    // schedule cron jobs after server starts.
    require('./cron').schedule();
  });
};
