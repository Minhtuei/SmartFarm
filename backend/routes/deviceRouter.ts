import { Router } from 'express';
import * as DeviceController from '../controllers/deviceController';

const router = Router();

router.route('/:userID').get(DeviceController.getAllDevice);
router.route('/:deviceID/updateUser').patch(DeviceController.updateDeviceUser);
router.route('/:deviceID/updateInfo').patch(DeviceController.updateDeviceInfos);
router
    .route('/:deviceID')
    .get(DeviceController.getDeviceInfo)
    .patch(DeviceController.updateDeviceInfo)
    .delete(DeviceController.deleteDevice);
router.route('/:userID/:sensorType').get(DeviceController.getValueByType);
export { router };
