import mongoose, { Schema } from 'mongoose';

const pumperSchema = new Schema({
    deviceID: String, //ref to device
    pumpDuration: Number
});

export default mongoose.model('Pumper', pumperSchema);
