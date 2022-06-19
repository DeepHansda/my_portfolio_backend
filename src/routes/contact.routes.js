const {createContact,showContacts,deleteContact} = require('../controllers/contact.controller');
const express = require('express');
const router = new express.Router();

router.post('/createContact',createContact)
router.get('/showContacts',showContacts)
router.post('/deleteContact/:id',deleteContact)
module.exports = router;