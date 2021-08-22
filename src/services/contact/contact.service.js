// Initializes the `contact` service on path `/contact`
const { Contact } = require('./contact.class');
const hooks = require('./contact.hooks');
const createModel = require('../../models/contacts.model.js');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true,
    whitelist: ['$elemMatch', '$regex', '$exists', '$options'],
  };

  // Initialize our service with any options it requires
  app.use('/contact', new Contact(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contact');

  service.hooks(hooks);
};
