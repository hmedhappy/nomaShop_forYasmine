const {
  getmarques,
  getmarqueById,
  addmarque,
  deletemarqueById,
  updatemarqueById,
} = require('./marque.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/marques/- Get all marques */
/**
 * @swagger
 * /marques:
 *  get:                                     #GET ALL marques
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - marques
 *    summary: "Get marques"
 *    description: Returns a single marque based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single marque
 */
router.get('/', /* checkToken ,*/ getmarques);

/** POST /api/v1/marques/ - Create new marque */
/**
 * @swagger
 * /marques:
 *  post:                                       #CREATE marque
 *    tags:
 *      - marques
 *    summary: "Create marque"
 *    description: create a single marque
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: marque object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addmarque'
 *    responses:
 *      200:
 *        description: marque created
 */
router.post('/', addmarque);

/** GET /api/v1/marques/:id - Get single marque by id */
/**
 *  @swagger
 * /marques/{id}:
 *  get:                                            #GET SINGLE marque
 *    tags:
 *      - marques
 *    summary: "Get Single marque"
 *    description: Update a single marque based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the marque"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: marque Updated
 *        schema:
 *            $ref: '#/definitions/Addmarque'
 */
router.get('/:id', checkToken, getmarqueById);

/** PATCH /api/v1/marques/:id - Update marque by id */
/**
 * @swagger
 * /marques/{id}:
 *  patch:                                           #UPDATE marque
 *    tags:
 *      - marques
 *    summary: "Update Single marque"
 *    description: Update a single marque based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the marque"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: marque object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addmarque'
 *    responses:
 *      200:
 *        description: marque Updated
 *        schema:
 *            $ref: '#/definitions/Addmarque'
 */
router.patch('/:id', updatemarqueById);

/** DELETE /api/v1/marques/:id - Delete marque by id */
/**
 * @swagger
 * /marques/{id}:
 *  delete:                                     #DELETE SINGLE marque
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - marques
 *    summary: "Delete Single marque"
 *    description: Delete a single marque based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the marque"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addmarque"
 *    responses:
 *      200:
 *        description: marque Deleted
 */
router.delete('/:id', deletemarqueById);

module.exports = router;
