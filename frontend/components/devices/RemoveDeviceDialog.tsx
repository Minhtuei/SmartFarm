import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';
import { DeviceService } from '@fe/services';
import { useEffect } from 'react';
export function RemoveDeviceDialog({ open, onClose, device }: DeviceInfoDialogProps) {
    const handleOnClick = async (deviceID: string) => {
        await DeviceService.removeDeviceUser(deviceID);
        onClose();
    };
    useEffect(() => {
        console.log('device', device);
    }, [device]);
    return (
        <Dialog placeholder={''} open={open} handler={onClose}>
            <DialogHeader placeholder={''} className='text-red-500'>
                Xoá thiết bị
            </DialogHeader>
            <DialogBody placeholder={'Nhập ID thiết bị'}>
                <Typography className='text-lg font-semibold' placeholder={undefined}>
                    Bạn có chắc chắn muốn xoá thiết bị này không?
                </Typography>
            </DialogBody>
            <DialogFooter placeholder={''}>
                <Button placeholder={''} variant='text' color='red' onClick={onClose} className='mr-1'>
                    <span>Huỷ bỏ</span>
                </Button>
                <Button placeholder={''} variant='gradient' color='green' onClick={() => handleOnClick(device?.adaFruitID || '')}>
                    <span>Chấp nhận</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
