import mongoose, { Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deviceSchemaFields: Record<keyof DeviceSchema, any> = {
    adaFruitID: { type: String, required: true },
    deviceName: { type: String, required: true },
    deviceState: { type: String, enum: ['ON', 'OFF', 'NONE'], required: true },
    deviceType: { type: String, enum: ['led', 'earthhumidity', 'airhumidity', 'temperature', 'waterpump', 'light'], required: true },
    userID: { type: String },
    schedule: [
        {
            startTime: { type: String },
            endTime: { type: String }
        }
    ],
    color: { type: String, enum: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white'], default: 'white' },
    minLimit: { type: Number, default: 0 },
    maxLimit: { type: Number, default: 0 },
    lastValue: { type: Number, required: true },
    updatedTime: { type: String, required: true },
    environmentValue: [
        {
            value: { type: Number },
            createdTime: { type: String },
            controlType: { type: String, enum: ['manual', 'schedule', 'limit'] }
        }
    ]
};

const deviceSchema = new Schema(deviceSchemaFields);

export const Device = mongoose.model('Device', deviceSchema);
