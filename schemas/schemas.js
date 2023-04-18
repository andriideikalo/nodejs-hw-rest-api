const Joi = require("joi");
const contacts = require("../models/contacts");
const contactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(new Error("missing required name field")),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .error(new Error("missing required email field")),
  phone: Joi.string()
    .required()
    .error(new Error("missing required phone field")),
});

module.exports = contactSchema;
