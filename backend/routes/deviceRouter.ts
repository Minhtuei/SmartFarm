import { Router } from 'express';
import * as DeviceController from '../controllers/deviceController';

const router = Router();

router.route('/getall').get(DeviceController.getAllDevice);
router
    .route('/:deviceID')
    .get(DeviceController.getDeviceInfo)
    .patch(DeviceController.updateDeviceInfo)
    .delete(DeviceController.deleteDevice);
router.route('/:userID/:sensorType').get(DeviceController.getValueByType);
export { router };
