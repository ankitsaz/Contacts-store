import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


export const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password :", hashedPassword);
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
});


export const currentUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: "Current user information" });
});
