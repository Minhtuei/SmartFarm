import mongoose, { Schema } from 'mongoose';

const notficationSchema = new Schema({
    context: String,
    notificationType: {
        type: String,
        enum: {
            values: ['warning', 'error', 'report', 'setting'],
            message: '{VALUE} is not support'
        }
    },
    time: Date,
    userID: String,
    deviceID: String
});

export default mongoose.model('Notification', notficationSchema);
