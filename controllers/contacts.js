const contacts = require("../models/contacts");
const RequestError = require("../helpers/RequestError");
const contactSchema = require("../schemas/schemas");
// const {validationBody} = require("../middlewares/validationBody");

const getListContacts = async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const postAddContact = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const putContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getListContacts,
  getContactById,
  postAddContact,
  deleteContactById,
  putContactById,
};
