import mongoose, { Schema } from 'mongoose';

const activatorSchema = new Schema({
    deviceID: String, //ref to device
    activatorType: {
        type: String,
        enum: {
            values: ['pumper', 'led']
        }
    },
    activateTime: Date,
    sensorID: String // ref to sensor
});

export default mongoose.model('Activator', activatorSchema);
