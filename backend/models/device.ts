import mongoose, { Schema } from 'mongoose';

// Define custom types

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deviceSchemaFields: Record<keyof DeviceSchema, any> = {
    adaFruitID: { type: String, required: true },
    deviceName: { type: String, required: true },
    deviceState: { type: String, enum: ['ON', 'OFF', 'NONE'], required: true },
    deviceType: { type: String, enum: ['led', 'earthhumidity', 'airhumidity', 'temperature', 'waterpump', 'light'], required: true },
    userID: { type: String },
    activateTime: { type: Date },
    pumpDuration: { type: Number },
    color: { type: String, enum: ['red', 'green', 'blue', 'yellow', 'purple', 'cyan', 'white', 'black'], default: 'white' },
    minLimit: { type: Number, default: 0 },
    maxLimit: { type: Number, default: 0 },
    lastValue: { type: Number, required: true },
    updatedTime: { type: String, required: true },
    environmentValue: [
        {
            value: { type: Number, required: true },
            createdTime: { type: String, required: true }
        }
    ]
};

const deviceSchema = new Schema(deviceSchemaFields);

export const Device = mongoose.model('Device', deviceSchema);
