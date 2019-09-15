const mongoose = require('mongoose');

const {MONGODB_URL} = require('../config');

module.exports = async () => {
  const options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  // connect to database.
  await mongoose.connect(MONGODB_URL, options);
};
