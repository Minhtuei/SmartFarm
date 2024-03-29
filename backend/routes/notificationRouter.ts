import { Router } from 'express';
import * as NotificationController from '../controllers/notificationController';

const router = Router();

router.route('/').post(NotificationController.createNotification);
router.route('/:userID').get(NotificationController.getAllNotification);
router.route('/:userID/:deviceID').get(NotificationController.getNotificationByDevice);
router.route('/:notificationID').delete(NotificationController.deleteNotification);
export { router };
