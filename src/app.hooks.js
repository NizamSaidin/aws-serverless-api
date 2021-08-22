// Application hooks that run for every service
const { castObjectIds, castDateTime } = require('./utils');
const { setNow } = require('feathers-hooks-common');
module.exports = {
  before: {
    all: [
      (hook) => {
        let { params, data, method } = hook;
        let { query } = params;

        if (
          query &&
          (method === 'get' || method === 'find' || method === 'remove')
        ) {
          hook.params.query = castObjectIds(query);
          hook.params.query = castDateTime(query);
        }

        if (data && (method === 'patch' || method === 'update')) {
          hook.data = castObjectIds(data);
        }
      },
    ],
    find: [],
    get: [],
    create: [setNow('createdAt', 'updatedAt')],
    update: [setNow('updatedAt')],
    patch: [setNow('updatedAt')],
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
