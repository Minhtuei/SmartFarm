import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Spinner } from '@material-tailwind/react';
import { DeviceService } from '@fe/services';
import { useState } from 'react';
import { Typography } from 'antd';

export function NewDeviceDialog({ open, onClose }: DeviceDialogProps) {
    const [deviceID, setDeviceID] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const checkFormat = (deviceID: string) => {
        const regex = /^[0-9]{7}$/;
        return regex.test(deviceID);
    };

    const handleOnClick = async () => {
        const hasInvalidId = deviceID.split(',').some((id) => {
            if (!checkFormat(id)) {
                setError('ID thiết bị không hợp lệ');
                return true;
            }
            return false;
        });

        if (hasInvalidId) {
            return;
        }
        try {
            setLoading(true);
            await DeviceService.addDevice(deviceID);
            setLoading(false);
            setError('');
        } catch (error) {
            console.error('Error adding device:', error);
            onClose();
        }
    };
    return (
        <Dialog placeholder={''} open={open} handler={onClose}>
            <DialogHeader placeholder={''} className='text-red-500'>
                Thêm thiết bị
            </DialogHeader>
            <DialogBody placeholder={'Nhập ID thiết bị'}>
                <Input
                    type='device'
                    placeholder='Nhập ID thiết bị, nếu muốn thêm nhiều thiết bị, hãy nhập cách nhau bằng dấu phẩy'
                    className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                    labelProps={{
                        className: 'hidden'
                    }}
                    containerProps={{ className: 'min-w-[100px] w-1/4' }}
                    crossOrigin={'none'}
                    value={deviceID}
                    onChange={(e) => setDeviceID(e.target.value)}
                />{' '}
                {error && <Typography className='text-red-500 text-md mt-3 font-semibold'>{error}</Typography>}
            </DialogBody>
            <DialogFooter placeholder={''}>
                <Button placeholder={''} variant='text' color='red' onClick={onClose} className='mr-1'>
                    <span>Huỷ bỏ</span>
                </Button>
                <Button placeholder={''} variant='gradient' color='green' onClick={() => handleOnClick()} disabled={loading}>
                    {loading ? <Spinner className='w-4 h-4' /> : 'Thêm thiết bị'}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
