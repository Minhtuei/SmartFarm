import mongoose, { Schema } from 'mongoose';

const deviceSchema = new Schema({
    //device
    deviceName: {
        type: String,
        required: true
    },
    deviceState: {
        type: Boolean,
        required: true
    },
    deviceType: {
        type: String,
        enum: {
            values: ['activator', 'sensor'],
            message: '{VALUE} is not support'
        }
    },
    userID: String,
    //activator
    activateTime: Date,
    //activator - pumper
    pumpDuration: Number,
    //activator - led
    color: String,
    //sensor
    sensorType: {
        type: String,
        enum: {
            values: ['light', 'earthHudmidity', 'airHumidity', 'temperature']
        }
    },
    activatorID: String,
    minLimit: {
        type: Number,
        required: true
    },
    maxLimit: Number,
    environmentValue: [
        {
            value: Number,
            time: Date
        }
    ]
});

export default mongoose.model('Device', deviceSchema);
