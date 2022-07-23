import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

export const signIn = asyncHandler(async(req, res) => {

    const {email, password} = req.body;

    const result = await User.findOne({email});

    if(result && (await bcrypt.compare(password, result.password))) {
        res.status(201).json({
            _id: result._id, name: result.name, email: result.email, token: generateToken(result._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user credentials.')
    }
})


export const signUp = asyncHandler(async(req, res) => {

    const {email, password, confirmPassword, firstName, lastName} = req.body;

    if(!firstName || !lastName || !email || !password || !confirmPassword) {
        res.status(400)
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({email});


    if(userExists) {
        res.status(400)
        throw new Error('User already exists.');
    }

    if(password !== confirmPassword) return res.status(400).json({message: "passwords don't match."});

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

    if(result) {
        res.status(201).json({
            _id: result.id, name: result.name, email: result.email, token: generateToken(result._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }

})

const generateToken = (id) => {
    return jwt.sign({id}, 'secret', {expiresIn: '1h'});
}