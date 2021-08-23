const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const { isValidEmail } = require('../utils');
dayjs.extend(customParseFormat);

module.exports = function (app) {
  const modelName = 'contacts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const schema = new Schema(
    {
      firstName: {
        type: String,
        required: [true, 'First Name is required'],
      },
      lastName: {
        type: String,
        required: [true, 'Last Name is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
          validator: (v) => isValidEmail(v),
          message: '{VALUE} is not a valid email address format',
        },
      },
      phoneNumber: {
        type: String,
        required: [true, 'Phone is required'],
        unique: true,
        min: [9, 'Invalid Phone Number'],
        max: [12, 'Invalid Phone Number'],
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      birthDate: {
        type: String,
        required: [true, 'Birth Date is required'],
        validate: {
          validator: (v) => dayjs(v, 'DD-MM-YYYY').isValid(),
          message:
            '{VALUE} is not a valid date format. Date format must be in DD-MM-YYYY',
        },
      },
    },

    {
      timestamps: true,
    }
  );
  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }

  return mongooseClient.model(modelName, schema);
};
