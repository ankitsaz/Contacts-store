import express from 'express'
import { deleteContact, getContact, getContacts, createContact, updateContact } from '../controllers/contactController.js';
const router = express.Router();

router.get('/', getContacts).post('/', createContact);

router.get("/:id", getContact).delete("/:id", deleteContact).put("/:id", updateContact);


export default router