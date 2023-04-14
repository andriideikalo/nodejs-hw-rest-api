const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const contacts = require("../../models/contacts");

router.get("/", ctrl.getListContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.postAddContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", ctrl.putContactById);

module.exports = router;
