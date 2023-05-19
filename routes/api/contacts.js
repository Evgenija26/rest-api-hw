const express = require("express");
const Joi = require("joi");

const contacts = require ("../../models/contacts.js");

const {HttpError} = require ("../../helpers");
const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.allContacts();
  res.json(result)
  } catch (error) {
    next (error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const{id} = req.params;
    const result = await contacts.getContactById(id);
    if(!result){
      throw HttpError (404, 'not found');
    }
    res.json(result);
    
  } catch (error) {
    next (error);
  }
  
});

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
        throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next (error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactd} = req.params;
    const result = await contacts.deleteContact(contactId);
    if(!result){
      throw HttpError (404, 'not found');
    }
    res.json({
      message: "Delete success"
    });
    
  } catch (error) {
    next (error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
        throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result){
      throw HttpError (404, 'not found');
    }
    res.json(result);
    
  } catch (error) {
    next (error);
  }
})

module.exports = router
