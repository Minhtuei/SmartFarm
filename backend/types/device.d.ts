type DeviceType = 'led' | 'earthhumidity' | 'airhumidity' | 'temperature' | 'waterpump' | 'light';
type ColorType = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'cyan' | 'white' | 'black';
type DeviceState = 'ON' | 'OFF' | 'NONE';
interface DeviceSchema {
    deviceName: string;
    deviceState: DeviceState;
    deviceType: DeviceType;
    userID: string;
    activateTime: Date;
    pumpDuration: number;
    color: ColorType;
    pumpDuration: number;
    minLimit: number;
    maxLimit: number;
    lastValue: number;
    updatedTime: string;
    environmentValue: { value: number; createdTime: string }[];
    adaFruitID: string;
}
