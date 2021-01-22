import { Router } from 'express';
import UserController from '../controllers/userController';
import Auth from '../middlewares/auth';
import JoiValidator from '../middlewares/joiValidator';

const router = Router();

const {
  roleValidator, roleIdValidator, forgotPassValidator, resetPassValidator
} = JoiValidator;
/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     summary: Update user role
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *             description: Role successfully updated.
 *       400:
 *             description: Bad request.
 *       404:
 *             description: User not found.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */

router.put('/:id/role', Auth.adminAuth, roleValidator, roleIdValidator, UserController.updateRole);
/**
 * @swagger
 * /users/forgotPassword:
 *   post:
 *     tags:
 *       - Users
 *     name: user
 *     summary: send a reset link email
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *             description: Email successfully sent.
 *       400:
 *             description: Bad request.
 *       404:
 *             description: User not found.
 *       500:
 *             description: server error.
 * */

router.post('/forgotPassword', forgotPassValidator, UserController.forgotPassword);
/**
 * @swagger
 * /users/resetPassword/{token}:
 *   put:
 *     tags:
 *       - Users
 *     name: user
 *     summary: Reset passsword
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *               confirmPassword:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *             description: Password successfully updated.
 *       400:
 *             description: Bad request.
 *       404:
 *             description: User not found.
 *       500:
 *             description: server error.
 * */
router.put('/resetPassword/:token', Auth.resetPassAuth, resetPassValidator, UserController.resetPassword);

export default router;
