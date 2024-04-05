import { validateEmail } from '@fe/utils';
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const GeneratePassword = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
    }
    return password;
};

export const GenerateOTP = (): string => {
    const chars = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
    }
    return password;
};

export const SendPassword = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Missing email!'
            });
        }
        if (!validateEmail(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Invalid email!'
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
        }
        const genPassword = GeneratePassword(10);
        user.updateOne({ password: genPassword });
        const express = require('express');
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace 'Gmail' with your email service provider
            auth: {
                user: 'nammnguyen0306@gmail.com', // Your email address
                pass: 'namNGUYEN2403.' // Your email password or app-specific password
            }
        });
        const app = express();
        app.get('/send-email', (req: Request, res: Response) => {
            // Define email options
            const mailOptions: nodemailer.SendMailOptions = {
                from: 'nammnguyen0306@gmail.com', // Sender email address
                to: email, // Recipient email address
                subject: genPassword + 'is your new password', // Email subject
                // Email body
                text:
                    'Hi!\n' +
                    'Thank you for using our service.\n' +
                    'Your password is :' +
                    genPassword +
                    '\nPlease do not reply this email.'
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).json({ error: 'Failed to send email' });
                } else {
                    console.log('Email sent:', info.response);
                    res.status(200).json({ message: 'Email sent successfully' });
                }
            });
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const SendOTP = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;

        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Missing email!'
            });
        }
        if (!validateEmail(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Invalid email!'
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
        }
        const genOTP = GenerateOTP();
        const currentTime = new Date();
        if (currentTime.getTime() - user.otpExpired.getTime() < 30 * 60000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'error',
                message: 'Not over 30 minutes'
            });
        }
        user.updateOne({ otp: genOTP, otpExpired: currentTime.getTime() + 30 * 60000 });
        const express = require('express');
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace 'Gmail' with your email service provider
            auth: {
                user: 'nammnguyen0306@gmail.com', // Your email address
                pass: 'namNGUYEN2403.' // Your email password or app-specific password
            }
        });
        const app = express();
        app.get('/send-email', (req: Request, res: Response) => {
            // Define email options
            const mailOptions: nodemailer.SendMailOptions = {
                from: 'nammnguyen0306@gmail.com', // Sender email address
                to: email, // Recipient email address
                subject: genOTP + 'is your verification code', // Email subject
                // Email body
                text:
                    'Hi!\n' +
                    'Thank you for using our service.\n' +
                    'Your verification code is :' +
                    genOTP +
                    '\n' +
                    'Please complete the verification process in 30 minutes.' +
                    '\nPlease do not reply this email.'
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).json({ error: 'Failed to send email' });
                } else {
                    console.log('Email sent:', info.response);
                    res.status(200).json({ message: 'Email sent successfully' });
                }
            });
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
