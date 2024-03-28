import mongoose, { Schema } from 'mongoose';
const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

interface IUser {
    name: string;
    email: string;
    phoneNumber: string;
    account: string;
    sessionID: number;
    password: string;
    accessToken: string;
    avatar: string; //image url
    major: string;
    location: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    account: String,
    sessionID: Number,
    password: {
        type: String,
        set(this: IUser, value: string) {
            this.password = crypto.publicEncrypt(publicKey, Buffer.from(value)).toString('base64');
        },
        get(this: IUser) {
            return crypto.privateDecrypt(privateKey, Buffer.from(this.password, 'base64')).toString();
        }
    },
    accessToken: String,
    avatar: String, //image url
    major: String,
    location: String
});

export default mongoose.model<IUser>('User', userSchema);
