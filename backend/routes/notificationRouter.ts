import { Router } from 'express';
import * as NotificationController from '../controllers/notificationController';

const router = Router();

router.route('/').post(NotificationController.createNotification);
router.route('/:userId').get(NotificationController.getAllNotification);
router.route('/:email/:deviceName').get(NotificationController.getNotificationByDevice);
router.route('/:notificationID').delete(NotificationController.deleteNotification);
export { router };
