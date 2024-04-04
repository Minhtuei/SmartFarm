import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import { DeviceService } from '@fe/services';
import { useState } from 'react';
interface NewDeviceDialogProps {
    open: boolean;
    onClose: () => React.Dispatch<React.SetStateAction<boolean>>;
}
export function NewDeviceDialog({ open, onClose }: NewDeviceDialogProps) {
    const [deviceID, setDeviceID] = useState<string>('');
    const handleOnClick = () => {
        console.log('Adding device:', deviceID);
        try {
            const response = DeviceService.addDevice(deviceID);
            console.log(response);
        } catch (error) {
            console.error('Error adding device:', error);
        }
        onClose();
    };
    return (
        <Dialog open={open} handler={onClose}>
            <DialogHeader className='text-red-500'>Thêm thiết bị</DialogHeader>
            <DialogBody>
                <Input
                    type='device'
                    placeholder='Nhập ID thiết bị'
                    className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                    labelProps={{
                        className: 'hidden'
                    }}
                    containerProps={{ className: 'min-w-[100px] w-1/4' }}
                    crossOrigin={'none'}
                    value={deviceID}
                    onChange={(e) => setDeviceID(e.target.value)}
                />{' '}
            </DialogBody>
            <DialogFooter>
                <Button variant='text' color='red' onClick={onClose} className='mr-1'>
                    <span>Huỷ bỏ</span>
                </Button>
                <Button variant='gradient' color='green' onClick={() => handleOnClick()}>
                    <span>Chấp nhận</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
