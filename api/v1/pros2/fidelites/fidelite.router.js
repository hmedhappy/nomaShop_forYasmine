const {
  getfidelites,
  getfideliteById,
  addfidelite,
  deletefideliteById,
  updatefideliteById,
} = require('./fidelite.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/fidelites/- Get all fidelites */
/**
 * @swagger
 * /fidelites:
 *  get:                                     #GET ALL fidelites
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fidelites
 *    summary: "Get fidelites"
 *    description: Returns a single fidelite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single fidelite
 */
router.get('/', /* checkToken ,*/ getfidelites);

/** POST /api/v1/fidelites/ - Create new fidelite */
/**
 * @swagger
 * /fidelites:
 *  post:                                       #CREATE fidelite
 *    tags:
 *      - fidelites
 *    summary: "Create fidelite"
 *    description: create a single fidelite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: fidelite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfidelite'
 *    responses:
 *      200:
 *        description: fidelite created
 */
router.post('/', addfidelite);

/** GET /api/v1/fidelites/:id - Get single fidelite by id */
/**
 *  @swagger
 * /fidelites/{id}:
 *  get:                                            #GET SINGLE fidelite
 *    tags:
 *      - fidelites
 *    summary: "Get Single fidelite"
 *    description: Update a single fidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fidelite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: fidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addfidelite'
 */
router.get('/:id', checkToken, getfideliteById);

/** PATCH /api/v1/fidelites/:id - Update fidelite by id */
/**
 * @swagger
 * /fidelites/{id}:
 *  patch:                                           #UPDATE fidelite
 *    tags:
 *      - fidelites
 *    summary: "Update Single fidelite"
 *    description: Update a single fidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fidelite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: fidelite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfidelite'
 *    responses:
 *      200:
 *        description: fidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addfidelite'
 */
router.patch('/:id', updatefideliteById);

/** DELETE /api/v1/fidelites/:id - Delete fidelite by id */
/**
 * @swagger
 * /fidelites/{id}:
 *  delete:                                     #DELETE SINGLE fidelite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fidelites
 *    summary: "Delete Single fidelite"
 *    description: Delete a single fidelite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fidelite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addfidelite"
 *    responses:
 *      200:
 *        description: fidelite Deleted
 */
router.delete('/:id', deletefideliteById);

module.exports = router;
