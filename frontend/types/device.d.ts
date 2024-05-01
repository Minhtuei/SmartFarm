type DeviceType = 'led' | 'earthhumidity' | 'airhumidity' | 'temperature' | 'waterpump' | 'light';
type ColorType = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'white';
type DeviceState = 'ON' | 'OFF' | 'NONE';
type ControlType = 'limit' | 'schedule ' | 'manual';
interface Schedule {
    startTime: string;
    endTime: string;
}
interface DeviceData {
    deviceName: string;
    deviceState: DeviceState;
    deviceType: DeviceType;
    userID?: string;
    pumpDuration?: number;
    color?: ColorType;
    minLimit?: number;
    maxLimit?: number;
    lastValue: number;
    updatedTime?: string;
    environmentValue: { value: number; createdTime: string; controlType: ControlType }[];
    adaFruitID: string;
    icon?: React.ReactElement;
    image?: string;
    schedule?: Schedule[];
}
interface DevicesInfo {
    deviceInfos: DeviceData[];
    getDeviceInfos: (userId: string, limit: number) => void;
}
interface DeviceCategory {
    longName: string;
    shortName: string;
    image: string;
    icon: JSX.Element;
    lineChartName: string;
    unit: string;
}
interface ActivateDevice {
    longName: string;
    shortName: string;
    image: string;
}
interface DeviceUpdateInfo {
    deviceName: string;
    minLimit: number;
    maxLimit: number;
    schedule: Schedule[];
    color?: ColorType;
}
