const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [
      (hook) => {
        return hook;
      },
    ],
    find: [
      (hook) => {
        let { params } = hook;
        let { query } = params;

        let sort = query.$sort || {};
        query.$sort = {
          createdAt: -1,
          firstName: -1,
          ...sort,
        };
      },
    ],
    get: [],
    create: [
      async (hook) => {
        let { app, data } = hook;
        let findExisting = await app.service('contact').findOne({
          query: {
            phoneNumber: data.phoneNumber,
          },
        });

        if (findExisting) {
          throw new errors.BadRequest(
            'Phone number already exist! Please choose another phone number.'
          );
        }
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
