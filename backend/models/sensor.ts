import mongoose, { Schema } from 'mongoose';

const sensorSchema = new Schema({
    deviceID: String, //ref to device
    activatorType: {
        type: String,
        enum: {
            values: ['light', 'earthHudmidity', 'airHumidity', 'temperature']
        }
    },
    activateTime: Date,
    minLimit: Number,
    maxLimit: Number
});

export default mongoose.model('Sensor', sensorSchema);
