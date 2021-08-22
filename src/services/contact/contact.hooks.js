const errors = require('@feathersjs/errors');
const { discard } = require('feathers-hooks-common');

const checkIdParams = () => async (hook) => {
  try {
    let { params, app } = hook;
    let { query = {} } = params;
    if (!query._id) {
      throw new errors.BadRequest('ID not found!');
    }
    let findExisting = await app.service('contact').findOne({
      query: {
        _id: query._id,
      },
    });

    if (!findExisting) {
      throw new errors.NotFound(`No record found with id ${query._id}!`);
    }
  } catch (e) {
    throw new errors.BadRequest(e);
  }
};

const validateData = () => async (hook) => {
  try {
    let { data = {}, app, method, params } = hook;

    let id = params.query._id || hook.id;

    let findExisting = await app.service('contact').findOne({
      query: {
        $or: [
          {
            _id: id,
          },
          {
            phoneNumber: data.phoneNumber,
          },
        ],
      },
    });

    if (findExisting) {
      if (method === 'create') {
        ///phone number must be unique when creating a new contact
        throw new errors.BadRequest(
          'Phone number already exist! Please choose another phone number.'
        );
      } else if (findExisting._id.toString() != id) {
        ///updating contact information must not have a same phone number
        throw new errors.BadRequest(
          'Phone number already exist! Please choose another phone number.'
        );
      } else {
        delete findExisting._id;
        delete findExisting.createdAt;
        delete findExisting.updatedAt;
        delete findExisting.__v;
        hook.data = {
          ...findExisting,
          ...hook.data,
        };
      }
    }
  } catch (e) {
    throw new errors.BadRequest(e);
  }
};

const afterHookResult = () => async (hook) => {
  hook.result = {
    message: 'success',
    status: 200,
    data: hook.result,
  };
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateData()],
    update: [validateData()],
    patch: [checkIdParams(), validateData()],
    remove: [checkIdParams()],
  },

  after: {
    all: [discard('__v')],
    find: [],
    get: [],
    create: [afterHookResult()],
    update: [afterHookResult()],
    patch: [afterHookResult()],
    remove: [afterHookResult()],
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
