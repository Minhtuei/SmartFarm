import mongoose, { Schema } from 'mongoose';
const bcrypt = require('bcrypt');
//const crypto = require('crypto');

// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem'
//     },
//     privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem'
//     }
// });

interface IUser {
    name: string;
    email: string;
    phoneNumber: string;
    account: string;
    sessionID: number;
    password: string;
    otp: string;
    otpExpired: Date;
    accessToken: string;
    avatar: string; //image url
    major: string;
    location: string;
    devices: string[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    account: String,
    sessionID: Number,
    password: String,
    otp: String,
    otpExpired: Date,
    accessToken: String,
    avatar: String, //image url
    major: String,
    location: String,
    devices: [String]
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return; // Skip hashing if password is not modified
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword; // Replace plaintext password with hashed password
});

export const User = mongoose.model('User', userSchema);
