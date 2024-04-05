import mongoose, { Schema } from 'mongoose';

const notficationSchema = new Schema(
    {
        context: String,
        notificationType: {
            type: String,
            enum: {
                values: ['warning', 'error', 'report', 'setting'],
                message: '{VALUE} is not support'
            }
        },
        email: { type: String, required: true },
        deviceName: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Notification', notficationSchema);
