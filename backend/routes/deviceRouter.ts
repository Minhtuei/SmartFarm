import { Router } from 'express';
import * as DeviceController from '../controllers/deviceController';

const router = Router();

router.route('/:userID').get(DeviceController.getAllDevice);
router.route('/').post(DeviceController.createDevice);
router
    .route('/:userID/:deviceID')
    .get(DeviceController.getDeviceInfo)
    .patch(DeviceController.updateDeviceInfo)
    .delete(DeviceController.deleteDevice);
router.route('/:userID/:sensorType').get(DeviceController.getValueByType);
export { router };
