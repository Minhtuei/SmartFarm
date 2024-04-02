type DeviceType = 'led' | 'earthhumidity' | 'airhumidity' | 'temperature' | 'waterpump' | 'light';
type ColorType = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'cyan' | 'white' | 'black';
type DeviceState = 'ON' | 'OFF' | 'NONE';
type DeviceCard = {
    id: string;
    name: string;
    state: DeviceState;
    type: DeviceType;
    icon: React.ReactElement;
    image: string;
};
