type DeviceType = 'led' | 'earthhumidity' | 'airhumidity' | 'temperature' | 'waterpump' | 'light';
type ColorType = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'cyan' | 'white' | 'black';
type DeviceState = 'ON' | 'OFF' | 'NONE';
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
    environmentValue: { value: number; createdTime: string }[];
    adaFruitID: string;
    icon?: React.ReactElement;
    image?: string;
}
interface DevicesInfo {
    deviceInfos: DeviceData[];
    getDeviceInfos: () => Promise<void>;
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
