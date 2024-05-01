import { Router } from 'express';
import * as DeviceController from '../controllers/deviceController';

const router = Router();

router.route('/:userID/:limit').get(DeviceController.getAllDevice);
router.route('/:deviceID/removeUser').patch(DeviceController.removeDeviceUser);
router.route('/updateUser').patch(DeviceController.updateDeviceUser);
router.route('/:deviceID/updateInfo').patch(DeviceController.updateDeviceInfos);
router.route('/removeManyDevice').patch(DeviceController.removeManyDevice);
router
    .route('/:deviceID')
    .get(DeviceController.getDeviceInfo)
    .patch(DeviceController.updateDeviceInfo)
    .delete(DeviceController.deleteDevice);
router.route('/:userID/:sensorType').get(DeviceController.getValueByType);
export { router };
