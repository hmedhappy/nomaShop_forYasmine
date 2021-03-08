const {
  getgrossistes,
  getgrossisteById,
  addgrossiste,
  deletegrossisteById,
  updategrossisteById,
} = require('./grossiste.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/grossistes/- Get all grossistes */
/**
 * @swagger
 * /grossistes:
 *  get:                                     #GET ALL grossistes
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - grossistes
 *    summary: "Get grossistes"
 *    description: Returns a single grossiste based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single grossiste
 */
router.get('/', /* checkToken ,*/ getgrossistes);

/** POST /api/v1/grossistes/ - Create new grossiste */
/**
 * @swagger
 * /grossistes:
 *  post:                                       #CREATE grossiste
 *    tags:
 *      - grossistes
 *    summary: "Create grossiste"
 *    description: create a single grossiste
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: grossiste object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgrossiste'
 *    responses:
 *      200:
 *        description: grossiste created
 */
router.post('/', addgrossiste);

/** GET /api/v1/grossistes/:id - Get single grossiste by id */
/**
 *  @swagger
 * /grossistes/{id}:
 *  get:                                            #GET SINGLE grossiste
 *    tags:
 *      - grossistes
 *    summary: "Get Single grossiste"
 *    description: Update a single grossiste based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the grossiste"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: grossiste Updated
 *        schema:
 *            $ref: '#/definitions/Addgrossiste'
 */
router.get('/:id', checkToken, getgrossisteById);

/** PATCH /api/v1/grossistes/:id - Update grossiste by id */
/**
 * @swagger
 * /grossistes/{id}:
 *  patch:                                           #UPDATE grossiste
 *    tags:
 *      - grossistes
 *    summary: "Update Single grossiste"
 *    description: Update a single grossiste based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the grossiste"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: grossiste object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgrossiste'
 *    responses:
 *      200:
 *        description: grossiste Updated
 *        schema:
 *            $ref: '#/definitions/Addgrossiste'
 */
router.patch('/:id', updategrossisteById);

/** DELETE /api/v1/grossistes/:id - Delete grossiste by id */
/**
 * @swagger
 * /grossistes/{id}:
 *  delete:                                     #DELETE SINGLE grossiste
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - grossistes
 *    summary: "Delete Single grossiste"
 *    description: Delete a single grossiste based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the grossiste"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgrossiste"
 *    responses:
 *      200:
 *        description: grossiste Deleted
 */
router.delete('/:id', deletegrossisteById);

module.exports = router;
