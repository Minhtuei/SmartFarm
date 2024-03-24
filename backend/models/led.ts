import mongoose, { Schema } from 'mongoose';

const ledSchema = new Schema({
    deviceID: String, //ref to device
    color: String
});

export default mongoose.model('Led', ledSchema);
