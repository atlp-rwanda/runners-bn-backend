/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import { Router } from 'express';
import code from '../helpers/statusCode';
import Response from '../helpers/sendResponse';

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

router.get('/', (_req, res) => Response.success(res, code.ok, 'Welcome to barefoot nomand'));

export default router;
