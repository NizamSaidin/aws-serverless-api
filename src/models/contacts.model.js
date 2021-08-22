require('mongoose-type-email');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
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
        type: mongooseClient.SchemaTypes.Email,
        required: [true, 'Email is required'],
      },
      phoneNumber: {
        type: String,
        required: [true, 'Phone is required'],
        validate: {
          validator: function (v) {
            return /^(601)[0-46-9]*[0-9]{7,8}$/i.test(v);
          },
          message: '{VALUE} is not a valid malaysia phone number!',
        },
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      birthDate: {
        type: String,

        required: [true, 'Birth Date is required'],
        validate: {
          validator: function (v) {
            return dayjs(v, 'DD-MM-YYYY').isValid();
          },
          message: '{VALUE} is not a valid date format. Date format must be in DD-MM-YYYY.',
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
