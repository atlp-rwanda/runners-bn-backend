import { Router } from 'express';
import UserController from '../controllers/userController';
import Auth from '../middlewares/auth';
import JoiValidator from '../middlewares/joiValidator';
import passportCheck from '../middlewares/passportCheck';

const router = Router();

const {
  roleValidator,
  roleIdValidator,
  forgotPassValidator,
  resetPassValidator,
  signinValidator,
  signupValidator
} = JoiValidator;

/**
 * @swagger
 * /users/signup:
 *    post:
 *     tags:
 *       - Users
 *     summary: register new user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *               lastName:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               confirmPassword:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       201:
 *             description: user successfully created.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: server error.
 * */

router.post('/signup', signupValidator, UserController.signup);

/**
 * @swagger
 * /users/login:
 *    post:
 *     tags:
 *       - Users
 *     summary: sign in a user
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
 *               password:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *            description: user successfully logged in.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: Unauthorized.
 *       500:
 *             description: server error.
 * */
router.post('/login', signinValidator, passportCheck, UserController.signin);

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

router.put('/:id/role', Auth.userAuth, roleValidator, roleIdValidator, UserController.updateRole);
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

/**
 * @swagger
 * /users/unsubscribe/{token}:
 *   patch:
 *     tags:
 *       - Users
 *     name: user
 *     summary: unsubscribe from email
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: User opted out from email notifications successfully.
 *       401:
 *             description: unauthorized.
 *       500:
 *             description: server error.
 * */
router.patch('/unsubscribe/:token', Auth.resetPassAuth, UserController.unsubscribe);
export default router;
