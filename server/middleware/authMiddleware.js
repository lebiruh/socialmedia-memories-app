import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const isCustomAuth = token.length < 500;

            let decoded;

            if(isCustomAuth) {
                
                decoded = jwt.verify(token, 'secret');
                // console.log(decoded);

                req.userId = decoded.id;
            } else {
                decoded = jwt_decode(token)
                req.userId = decoded.sub;
            }

            next();

        } catch (error) {
            console.log(error);
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

export default protect;