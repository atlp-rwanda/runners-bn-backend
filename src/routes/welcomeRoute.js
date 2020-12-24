import { Router } from 'express';
import { Response } from '../helpers/sendResponse';
import models from '../database/models';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - welcome
 *     name: Routes
 *     summary: Tests the routes using swagger documentation
 *     consumes:
 *        - application/json
 *     responses:
 *          200:
 *                description: successfully working
 * */

router.get('/', (_req, res) => Response.success(res, 200, 'Welcome to barefoot nomand'));

router.get('/user', async (req, res) => {
  const users = await models.User.findAll();
  Response.success(res, 200, 'users fetched successfully', users);
});

export default router;
