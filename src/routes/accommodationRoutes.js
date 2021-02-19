import express from 'express';
import multerAccommodationUploads from '../config/multer';
import CrudAccommodations from '../controllers/accommodationController';
import Validations from '../middlewares/joiValidator';
import Auth from '../middlewares/auth';
import isAllowed from '../middlewares/isAllowed';

const router = express.Router();
const { accommodationValidator } = Validations;

const {
  createAccommodation, GetAllAccommodations,
  GetSingleccommodation, deleteAccommodation, updateAccommodation
} = CrudAccommodations;

const { userAuth } = Auth;
const { isTripAdmin } = isAllowed;

/**
 * @swagger
 * /accommodations:
 *   post:
 *     tags:
 *       - Accommodation
 *     security:
 *       - bearerAuth: []
 *     summary: Create accommodation accommodation
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               accommodationName:
 *                 type: string
 *                 required: true
 *               accommodationType:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: string
 *                 format: binary
 *                 required: false
 *               amenities:
 *                 type: string
 *                 required: true
 *               numberOfRooms:
 *                 type: number
 *                 required: true
 *               latitude:
 *                 type: number
 *                 required: true
 *               longitude:
 *                 type: number
 *                 required: true
 *               locationId:
 *                 type: number
 *                 required: true
 *               streetAddress:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       201:
 *             description: Accommodation successfully created.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unAuthorized.
 *       403:
 *             description: forbiden.
 *       500:
 *             description: server error.
 * */

router.post('/',
  userAuth,
  isTripAdmin,
  multerAccommodationUploads,
  accommodationValidator,
  createAccommodation);

/**
 * @swagger
 * /accommodations:
 *   get:
 *     tags:
 *       - Accommodation
 *     summary: Get all Accommodations
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *             description: Successfully found all Accommodations.
 *       404:
 *             description: Accommodations not found.
 *       500:
 *             description: server error.
 * */

router.get('/', GetAllAccommodations);

/**
 * @swagger
 * /accommodations/{id}:
 *   get:
 *     tags:
 *       - Accommodation
 *     summary: Get single Accommodation
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully found accommodation.
 *       404:
 *             description: Accommodations not found.
 *       500:
 *             description: server error.
 * */

router.get('/:id', GetSingleccommodation);

/**
 * @swagger
 * /accommodations/{id}:
 *   delete:
 *     tags:
 *       - Accommodation
 *     security:
 *       - bearerAuth: []
 *     name: Accommodations
 *     summary: Deletes Accommodation
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Accommodation successfully deleted.
 *       404:
 *             description: Accommodation not found.
 *       500:
 *             description: server error.
 *       401:
 *             description: unauthorized
 * */

router.delete('/:id',
  userAuth,
  isTripAdmin,
  deleteAccommodation);

/**
 * @swagger
 * /accommodations/{id}:
 *   put:
 *     tags:
 *       - Accommodation
 *     security:
 *       - bearerAuth: []
 *     summary: update accommodation
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               accommodationName:
 *                 type: string
 *                 required: true
 *               accommodationType:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: string
 *                 format: binary
 *                 required: false
 *               amenities:
 *                 type: string
 *                 required: true
 *               numberOfRooms:
 *                 type: number
 *                 required: true
 *               latitude:
 *                 type: number
 *                 required: true
 *               longitude:
 *                 type: number
 *                 required: true
 *               locationId:
 *                 type: number
 *                 required: true
 *               streetAddress:
 *                 type: string
 *                 required: true
 *
 *     responses:
 *       200:
 *             description: Accommodation successfully updated.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unAuthorized.
 *       403:
 *             description: forbiden.
 *       500:
 *             description: server error.
 * */

router.put('/:id',
  userAuth,
  isTripAdmin,
  multerAccommodationUploads,
  accommodationValidator,
  updateAccommodation);
export default router;
