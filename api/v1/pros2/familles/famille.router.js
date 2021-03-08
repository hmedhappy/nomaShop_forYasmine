const {
  getfamilles,
  getfamilleById,
  addfamille,
  deletefamilleById,
  updatefamilleById,
} = require('./famille.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/familles/- Get all familles */
/**
 * @swagger
 * /familles:
 *  get:                                     #GET ALL familles
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - familles
 *    summary: "Get familles"
 *    description: Returns a single famille based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single famille
 */
router.get('/', /* checkToken ,*/ getfamilles);

/** POST /api/v1/familles/ - Create new famille */
/**
 * @swagger
 * /familles:
 *  post:                                       #CREATE famille
 *    tags:
 *      - familles
 *    summary: "Create famille"
 *    description: create a single famille
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: famille object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfamille'
 *    responses:
 *      200:
 *        description: famille created
 */
router.post('/', addfamille);

/** GET /api/v1/familles/:id - Get single famille by id */
/**
 *  @swagger
 * /familles/{id}:
 *  get:                                            #GET SINGLE famille
 *    tags:
 *      - familles
 *    summary: "Get Single famille"
 *    description: Update a single famille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the famille"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: famille Updated
 *        schema:
 *            $ref: '#/definitions/Addfamille'
 */
router.get('/:id', checkToken, getfamilleById);

/** PATCH /api/v1/familles/:id - Update famille by id */
/**
 * @swagger
 * /familles/{id}:
 *  patch:                                           #UPDATE famille
 *    tags:
 *      - familles
 *    summary: "Update Single famille"
 *    description: Update a single famille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the famille"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: famille object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfamille'
 *    responses:
 *      200:
 *        description: famille Updated
 *        schema:
 *            $ref: '#/definitions/Addfamille'
 */
router.patch('/:id', updatefamilleById);

/** DELETE /api/v1/familles/:id - Delete famille by id */
/**
 * @swagger
 * /familles/{id}:
 *  delete:                                     #DELETE SINGLE famille
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - familles
 *    summary: "Delete Single famille"
 *    description: Delete a single famille based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the famille"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addfamille"
 *    responses:
 *      200:
 *        description: famille Deleted
 */
router.delete('/:id', deletefamilleById);

module.exports = router;
