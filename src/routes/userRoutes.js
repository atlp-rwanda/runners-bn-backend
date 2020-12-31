import { Router } from 'express';
import UserController from '../controllers/user';
import Auth from '../middlewares/auth';
import JoiValidator from '../middlewares/joiValidator';

const router = Router();
const { roleValidator, roleIdValidator } = JoiValidator;
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
 *               newRole:
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

export default router;
