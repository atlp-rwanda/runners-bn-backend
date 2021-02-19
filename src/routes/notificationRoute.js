import { Router } from 'express';
import Notifications from '../controllers/notificationController';
import Auth from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /notification:
 *   get:
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     name: notification
 *     summary: Get all notifications
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *             description: notifications succcessfuly found.
 *       401:
 *             description: unauthorized.
 *       500:
 *             description: server error.
 * */
router.get('/', Auth.userAuth, Notifications.getNotifications);
/**
 * @swagger
 * /notification/read?id={id}:
 *   patch:
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     name: notification
 *     summary: Get all notifications
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: notification sucessfuly read.
 *       401:
 *             description: unauthorized.
 *       500:
 *             description: server error.
 * */
router.patch('/read', Auth.userAuth, Notifications.markAsRead);

/**
 * @swagger
 * /notification/readall:
 *   patch:
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     name: notification
 *     summary: Get all notifications
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *             description: notification sucessfuly read.
 *       401:
 *             description: unauthorized.
 *       500:
 *             description: server error.
 * */
router.patch('/readall', Auth.userAuth, Notifications.markAsRead);

export default router;
