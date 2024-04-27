import { validateEmail } from '@fe/utils';
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
const EMAIL = process.env.EMAIL_ADDRESS;
const PASSWORD = process.env.APP_PASSWORD;
export const GeneratePassword = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
    }
    return password + '123@';
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
        await user.updateOne({ password: genPassword });
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace 'Gmail' with your email service provider
            auth: {
                user: EMAIL, // Your email address
                pass: PASSWORD // Your email password or app-specific password
            }
        });
        // Define email options
        const mailOptions: nodemailer.SendMailOptions = {
            from: EMAIL, // Sender email address
            to: email, // Recipient email address
            subject: genPassword + 'is your new password', // Email subject
            // Email body
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Content</title>
            </head>
            <body>
            <p style="font-size: 18px; color: black;">Hi!</p>
            <p style="font-size: 18px; color: black;">Thank you for using our service.</p>
            <p style="font-size: 18px; color: black;">Your password is: <span style="font-size: 24px; color: blue;"><b>${genPassword}</b></span></p>
            <p style="font-size: 18px; color: black;">Please do not reply to this email.</p>
            </body>
            </html>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return res.status(StatusCodes.OK).json({ message: 'Message sent' });
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
        await user.updateOne({ otp: genOTP, otpExpired: currentTime.getTime() + 30 * 60000 });
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace 'Gmail' with your email service provider
            auth: {
                user: EMAIL, // Your email address
                pass: PASSWORD // Your email password or app-specific password
            }
        });
        const mailOptions: nodemailer.SendMailOptions = {
            from: EMAIL, // Sender email address
            to: email, // Recipient email address
            subject: genOTP + 'is your verification code', // Email subject
            // Email body
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Content</title>
            </head>
            <body>
            <p style="font-size: 18px; color: black;">Hi!</p>
            <p style="font-size: 18px; color: black;">Thank you for using our service.</p>
            <p style="font-size: 18px; color: black;">Your verification code is: <span style="font-size: 24px; color: blue;"><b>${genOTP}</b></span></p>
            <p style="font-size: 18px; color: black;">Please complete the verification process in 30 minutes.</p>
            <p style="font-size: 18px; color: black;">Please do not reply to this email.</p>
            </body>
            </html>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
//attach to create notification in notification controller
export const SendNotification = async (req: Request, res: Response) => {
    try {
        const { context, email, deviceName } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace 'Gmail' with your email service provider
            auth: {
                user: EMAIL, // Your email address
                pass: PASSWORD // Your email password or app-specific password
            }
        });
        const mailOptions: nodemailer.SendMailOptions = {
            from: EMAIL, // Sender email address
            to: email, // Recipient email address
            subject: 'A notice from' + deviceName, // Email subject
            // Email body
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Content</title>
            </head>
            <body>
            <p style="font-size: 18px; color: black;">Hi!</p>
            <p style="font-size: 18px; color: black;">Thank you for using our service.</p>
            <p style="font-size: 18px; color: black;">There is a notice from: <span style="font-size: 24px; color: orange;"><b>${deviceName}</b></span></p>
            <p style="font-size: 18px; color: black;">${context}</p>
            <p style="font-size: 18px; color: black;">Please do not reply to this email.</p>
            </body>
            </html>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
