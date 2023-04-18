const RequestError = require("../helpers/RequestError");

const validationBodyAdd = (contactSchema) => {
  const func = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    next();
  };
  return func;
};
const validationBodyUpdate = (contactSchema) => {
  const func = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error && !req.body.name && !req.body.email && !req.body.phone) {
      throw RequestError(400, "missing fields");
    }
    if (error) {
      throw RequestError(400, error.message);
    }
    next();
  };
  return func;
};

module.exports = { validationBodyAdd, validationBodyUpdate };
