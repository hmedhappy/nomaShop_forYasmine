const {
  getgammes,
  getgammeById,
  addgamme,
  deletegammeById,
  updategammeById,
} = require('./gamme.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/gammes/- Get all gammes */
/**
 * @swagger
 * /gammes:
 *  get:                                     #GET ALL gammes
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gammes
 *    summary: "Get gammes"
 *    description: Returns a single gamme based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single gamme
 */
router.get('/', /* checkToken ,*/ getgammes);

/** POST /api/v1/gammes/ - Create new gamme */
/**
 * @swagger
 * /gammes:
 *  post:                                       #CREATE gamme
 *    tags:
 *      - gammes
 *    summary: "Create gamme"
 *    description: create a single gamme
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: gamme object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgamme'
 *    responses:
 *      200:
 *        description: gamme created
 */
router.post('/', addgamme);

/** GET /api/v1/gammes/:id - Get single gamme by id */
/**
 *  @swagger
 * /gammes/{id}:
 *  get:                                            #GET SINGLE gamme
 *    tags:
 *      - gammes
 *    summary: "Get Single gamme"
 *    description: Update a single gamme based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gamme"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: gamme Updated
 *        schema:
 *            $ref: '#/definitions/Addgamme'
 */
router.get('/:id', checkToken, getgammeById);

/** PATCH /api/v1/gammes/:id - Update gamme by id */
/**
 * @swagger
 * /gammes/{id}:
 *  patch:                                           #UPDATE gamme
 *    tags:
 *      - gammes
 *    summary: "Update Single gamme"
 *    description: Update a single gamme based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gamme"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: gamme object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgamme'
 *    responses:
 *      200:
 *        description: gamme Updated
 *        schema:
 *            $ref: '#/definitions/Addgamme'
 */
router.patch('/:id', updategammeById);

/** DELETE /api/v1/gammes/:id - Delete gamme by id */
/**
 * @swagger
 * /gammes/{id}:
 *  delete:                                     #DELETE SINGLE gamme
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gammes
 *    summary: "Delete Single gamme"
 *    description: Delete a single gamme based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gamme"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgamme"
 *    responses:
 *      200:
 *        description: gamme Deleted
 */
router.delete('/:id', deletegammeById);

module.exports = router;
