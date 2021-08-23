const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');

//cast mongoDb id strings into ObjectIds
const castObjectIds = (obj) => {
  try {
    if (/^[abcdefABCDEF\d]{24}$/.test(`${obj}`)) return new ObjectID(obj);
    if (Array.isArray(obj)) return obj.map(castObjectIds);
    if (!obj) return obj;
    if (_.isPlainObject(obj))
      return Object.keys(obj).reduce(
        (a, i) => ({ ...a, [i]: castObjectIds(obj[i]) }),
        {}
      );
    return obj;
  } catch (e) {
    return obj;
  }
};

//cast datetime strings into javascript datetime
const castDateTime = (obj) => {
  try {
    if (_.isPlainObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (key === 'createdAt' || key === 'updatedAt') {
          let lte = obj[key].$lte;
          let lt = obj[key].$lt;
          let gte = obj[key].$gte;
          let gt = obj[key].$gt;
          if (lte) {
            obj[key].$lte = new Date(lte);
          }
          if (gte) {
            obj[key].$gte = new Date(gte);
          }
          if (lt) {
            obj[key].$lt = new Date(lt);
          }
          if (gt) {
            obj[key].$gt = new Date(gt);
          }
        }
      });
    }

    return obj;
  } catch (e) {
    return obj;
  }
};

const cleanObject = (obj) => {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

const isValidEmail = (email) => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

module.exports = {
  castObjectIds,
  castDateTime,
  cleanObject,
  isValidEmail,
};
