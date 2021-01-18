import { Router } from 'express';
import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';

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
