const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  mongoose
    .connect(process.env.MONGODB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
