import mongoose, { Schema } from 'mongoose';

const notficationSchema = new Schema(
    {
        context: String,
        notificationType: {
            type: String,
            enum: {
                values: ['warning', 'error', 'success', 'schedule'],
                message: '{VALUE} is not support'
            }
        },
        email: { type: String, required: true },
        deviceName: { type: String, required: true }
    },
    { timestamps: true }
);

export const Notification = mongoose.model('Notification', notficationSchema);
