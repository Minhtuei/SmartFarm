import mongoose, { Schema } from 'mongoose';

const environmentInfoSchema = new Schema({
    sensorID: String,
    captureTime: Date,
    value: Number
});

export default mongoose.model('EnvironmentInfo', environmentInfoSchema);
