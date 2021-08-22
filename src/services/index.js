const findOne = require('feathers-findone');
const contact = require('./contact/contact.service.js');

module.exports = function (app) {
  app.configure(findOne());
  app.configure(contact);
};
