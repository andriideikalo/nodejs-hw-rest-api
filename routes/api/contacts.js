const express = require("express");
const router = express.Router();
const contactSchema = require("../../schemas/schemas");
const check = require("../../middlewares/validationBody");

const ctrl = require("../../controllers/contacts");
const contacts = require("../../models/contacts");

router.get("/", ctrl.getListContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", check.validationBodyAdd(contactSchema), ctrl.postAddContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put(
  "/:contactId",
  check.validationBodyUpdate(contactSchema),
  ctrl.putContactById
);

module.exports = router;
