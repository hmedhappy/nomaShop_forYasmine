const {
  getdetailachats,
  getdetailachatById,
  adddetailachat,
  deletedetailachatById,
  updatedetailachatById,
} = require('./detailachat.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/detailachats/- Get all detailachats */
/**
 * @swagger
 * /detailachats:
 *  get:                                     #GET ALL detailachats
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - detailachats
 *    summary: "Get detailachats"
 *    description: Returns a single detailachat based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single detailachat
 */
router.get('/', /* checkToken ,*/ getdetailachats);

/** POST /api/v1/detailachats/ - Create new detailachat */
/**
 * @swagger
 * /detailachats:
 *  post:                                       #CREATE detailachat
 *    tags:
 *      - detailachats
 *    summary: "Create detailachat"
 *    description: create a single detailachat
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: detailachat object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Adddetailachat'
 *    responses:
 *      200:
 *        description: detailachat created
 */
router.post('/', adddetailachat);

/** GET /api/v1/detailachats/:id - Get single detailachat by id */
/**
 *  @swagger
 * /detailachats/{id}:
 *  get:                                            #GET SINGLE detailachat
 *    tags:
 *      - detailachats
 *    summary: "Get Single detailachat"
 *    description: Update a single detailachat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: detailachat Updated
 *        schema:
 *            $ref: '#/definitions/Adddetailachat'
 */
router.get('/:id', checkToken, getdetailachatById);

/** PATCH /api/v1/detailachats/:id - Update detailachat by id */
/**
 * @swagger
 * /detailachats/{id}:
 *  patch:                                           #UPDATE detailachat
 *    tags:
 *      - detailachats
 *    summary: "Update Single detailachat"
 *    description: Update a single detailachat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: detailachat object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Adddetailachat'
 *    responses:
 *      200:
 *        description: detailachat Updated
 *        schema:
 *            $ref: '#/definitions/Adddetailachat'
 */
router.patch('/:id', updatedetailachatById);

/** DELETE /api/v1/detailachats/:id - Delete detailachat by id */
/**
 * @swagger
 * /detailachats/{id}:
 *  delete:                                     #DELETE SINGLE detailachat
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - detailachats
 *    summary: "Delete Single detailachat"
 *    description: Delete a single detailachat based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Adddetailachat"
 *    responses:
 *      200:
 *        description: detailachat Deleted
 */
router.delete('/:id', deletedetailachatById);

module.exports = router;
