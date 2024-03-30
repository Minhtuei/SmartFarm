import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { validateEmail, validatePassword } from '@fe/utils';
import User from 'backend/models/user'; // Assuming "User" is exported directly from the user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
config();

const generateToken = (email: string) => {
    const jwtSecretKey = process.env.JWT_SECRET;
    // console.log(jwtSecretKey);
    const data = {
        email
    };
    return jwt.sign(data, jwtSecretKey); // You forgot to pass the secret key
};

const login = async (req: Request, res: Response) => {
    try {
        // base64 decode the data: email, password
        const { email, password } = req.body;
        if (!validateEmail(email) && !validatePassword(password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'The email or password invalid.'
            });
        }
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Request missing email or password'
            });
        }
        // Assuming the username is in req.body.name
        const user = await User.findOne({ email: email }); // Using findOne instead of findALL and awaiting the result
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
        }
        // console.log(user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Password incorrect' });
        }
        // Assuming you have user ID in the user object, adjust this accordingly based on your schema
        // const { email } = user;

        // Generate token
        const token = generateToken(email);
        // req.session.token = token;
        // Send token in response
        return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

export { generateToken, login };
