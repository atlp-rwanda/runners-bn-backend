import { Router } from 'express';
import CommentController from '../controllers/commentController';
import TripController from '../controllers/tripController';
import JoiValidator from '../middlewares/joiValidator';

import Auth from '../middlewares/auth';
import isAllowed from '../middlewares/isAllowed';
import isValidTrip from '../middlewares/isValidTrip';

const {
  tripReqValidator, tripIdValidator, roleIdValidator, commentValidator
} = JoiValidator;
const { addComment, getcomments, deleteComment } = CommentController;
const {
  create, getAll, getOne, update
} = TripController;
const { adminAuth } = Auth;

const router = Router();

/**
 * @swagger
 * /trips/new:
 *   post:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new a trip
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: number
 *                 required: true
 *               to:
 *                 type: number
 *                 required: true
 *               reason:
 *                 type: string
 *                 required: true
 *               travelDate:
 *                 type: date
 *                 required: true
 *               returnDate:
 *                 type: date
 *
 *     responses:
 *       201:
 *             description: Trip successfully Created.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: Trip already exists.
 *       403:
 *             description: user not allowed
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */

router.post('/new', adminAuth, tripReqValidator, create);
/**
 * @swagger
 * /trips:
 *   get:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     summary: Get all trips
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *             description: Successfully found all trips.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */
router.get('/', adminAuth, getAll);
/**
 * @swagger
 * /trips/{tripId}:
 *   get:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     summary: retrieve single trip
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: tripId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully found the trip.
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */
router.get('/:tripId', adminAuth, tripIdValidator, getOne);
/**
 * @swagger
 * /trips/{tripId}:
 *   put:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     summary: Updates a trip
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: tripId
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: number
 *                 required: true
 *               to:
 *                 type: number
 *                 required: true
 *               reason:
 *                 type: string
 *                 required: true
 *               travelDate:
 *                 type: date
 *                 required: true
 *               returnDate:
 *                 type: date
 *
 *     responses:
 *       201:
 *             description: Trip successfully Created.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: Trip already exists.
 *       403:
 *             description: user not allowed
 *       401:
 *             description: Unauthorized
 *       500:
 *             description: server error.
 * */
router.put('/:tripId', adminAuth, tripIdValidator, tripReqValidator, update);
/**
 * @swagger
 * /trips/{id}/comment:
 *   post:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     summary: add a comment on a trip
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
 *               comment:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *             description: Successfully commented on a trip.
 *       400:
 *             description: bad request
 *       401:
 *             description: Unauthorized
 *       403:
 *             description: forbidden
 *       500:
 *             description: server error.
 * */
router.post('/:id/comment', adminAuth, isAllowed.isCommentator, roleIdValidator, isValidTrip.isValid, commentValidator, addComment);
/**
 * @swagger
 * /trips/{id}/comments:
 *   get:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     summary: gets all comments on a trip
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully retrieved comments.
 *       400:
 *             description: bad request
 *       401:
 *             description: Unauthorized
 *       403:
 *             description: forbidden
 *       500:
 *             description: server error.
 * */
router.get('/:id/comments', adminAuth, isAllowed.isCommentator, roleIdValidator, getcomments);
/**
 * @swagger
 * /trips/comments/{id}:
 *   delete:
 *     tags:
 *       - Trips
 *     security:
 *       - bearerAuth: []
 *     summary: deletes a comment
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully deleted the comment.
 *       400:
 *             description: bad request
 *       401:
 *             description: Unauthorized
 *       403:
 *             description: forbidden
 *       404:
 *            description: not found
 *       500:
 *             description: server error.
 * */
router.delete('/comments/:id', adminAuth, roleIdValidator, deleteComment);

export default router;
