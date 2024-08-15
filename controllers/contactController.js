import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import contactModel from '../models/contactModel.js';

const router = express.Router();



export const getContacts = expressAsyncHandler(async (req, res) => {
    const contacts = await contactModel.find();
    res.status(200).json(contacts);
});

export const createContact = expressAsyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

export const getContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
});

export const updateContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

export const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    //await contactModel.findByIdAndRemove(req.params.id);
    await contactModel.deleteOne();
    res.status(200).json(contact);
});
