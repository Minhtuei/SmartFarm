type DeviceDialogProps = {
    open: boolean;
    onClose: () => void;
};
type DeviceInfoDialogProps = {
    open: boolean;
    onClose: () => void;
    device: DeviceData | null;
};
