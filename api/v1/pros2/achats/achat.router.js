const {
  getachats,
  getachatById,
  addachat,
  deleteachatById,
  updateachatById,
} = require('./achat.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/achats/- Get all achats */
/**
 * @swagger
 * /achats:
 *  get:                                     #GET ALL achats
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - achats
 *    summary: "Get achats"
 *    description: Returns a single achat based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single achat
 */
router.get('/', /* checkToken ,*/ getachats);

/** POST /api/v1/achats/ - Create new achat */
/**
 * @swagger
 * /achats:
 *  post:                                       #CREATE achat
 *    tags:
 *      - achats
 *    summary: "Create achat"
 *    description: create a single achat
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: achat object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addachat'
 *    responses:
 *      200:
 *        description: achat created
 */
router.post('/', addachat);

/** GET /api/v1/achats/:id - Get single achat by id */
/**
 *  @swagger
 * /achats/{id}:
 *  get:                                            #GET SINGLE achat
 *    tags:
 *      - achats
 *    summary: "Get Single achat"
 *    description: Update a single achat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the achat"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: achat Updated
 *        schema:
 *            $ref: '#/definitions/Addachat'
 */
router.get('/:id', checkToken, getachatById);

/** PATCH /api/v1/achats/:id - Update achat by id */
/**
 * @swagger
 * /achats/{id}:
 *  patch:                                           #UPDATE achat
 *    tags:
 *      - achats
 *    summary: "Update Single achat"
 *    description: Update a single achat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the achat"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: achat object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addachat'
 *    responses:
 *      200:
 *        description: achat Updated
 *        schema:
 *            $ref: '#/definitions/Addachat'
 */
router.patch('/:id', updateachatById);

/** DELETE /api/v1/achats/:id - Delete achat by id */
/**
 * @swagger
 * /achats/{id}:
 *  delete:                                     #DELETE SINGLE achat
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - achats
 *    summary: "Delete Single achat"
 *    description: Delete a single achat based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the achat"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addachat"
 *    responses:
 *      200:
 *        description: achat Deleted
 */
router.delete('/:id', deleteachatById);

module.exports = router;
