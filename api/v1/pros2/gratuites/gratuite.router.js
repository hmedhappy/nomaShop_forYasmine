const {
  getgratuites,
  getgratuiteById,
  addgratuite,
  deletegratuiteById,
  updategratuiteById,
} = require('./gratuite.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/gratuites/- Get all gratuites */
/**
 * @swagger
 * /gratuites:
 *  get:                                     #GET ALL gratuites
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gratuites
 *    summary: "Get gratuites"
 *    description: Returns a single gratuite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single gratuite
 */
router.get('/', /* checkToken ,*/ getgratuites);

/** POST /api/v1/gratuites/ - Create new gratuite */
/**
 * @swagger
 * /gratuites:
 *  post:                                       #CREATE gratuite
 *    tags:
 *      - gratuites
 *    summary: "Create gratuite"
 *    description: create a single gratuite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: gratuite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgratuite'
 *    responses:
 *      200:
 *        description: gratuite created
 */
router.post('/', addgratuite);

/** GET /api/v1/gratuites/:id - Get single gratuite by id */
/**
 *  @swagger
 * /gratuites/{id}:
 *  get:                                            #GET SINGLE gratuite
 *    tags:
 *      - gratuites
 *    summary: "Get Single gratuite"
 *    description: Update a single gratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gratuite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: gratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addgratuite'
 */
router.get('/:id', checkToken, getgratuiteById);

/** PATCH /api/v1/gratuites/:id - Update gratuite by id */
/**
 * @swagger
 * /gratuites/{id}:
 *  patch:                                           #UPDATE gratuite
 *    tags:
 *      - gratuites
 *    summary: "Update Single gratuite"
 *    description: Update a single gratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gratuite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: gratuite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgratuite'
 *    responses:
 *      200:
 *        description: gratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addgratuite'
 */
router.patch('/:id', updategratuiteById);

/** DELETE /api/v1/gratuites/:id - Delete gratuite by id */
/**
 * @swagger
 * /gratuites/{id}:
 *  delete:                                     #DELETE SINGLE gratuite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gratuites
 *    summary: "Delete Single gratuite"
 *    description: Delete a single gratuite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gratuite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgratuite"
 *    responses:
 *      200:
 *        description: gratuite Deleted
 */
router.delete('/:id', deletegratuiteById);

module.exports = router;
