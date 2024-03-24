import mongoose, { Schema } from 'mongoose';

const deviceSchema = new Schema({
    deviceName: String,
    deviceState: Boolean,
    deviceType: {
        type: String,
        enum: {
            values: ['activator', 'sensor'],
            message: '{VALUE} is not support'
        }
    },
    userID: String
});

export default mongoose.model('Device', deviceSchema);
