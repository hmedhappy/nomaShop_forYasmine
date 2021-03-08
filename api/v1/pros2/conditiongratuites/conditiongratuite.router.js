const {
  getconditiongratuites,
  getconditiongratuiteById,
  addconditiongratuite,
  deleteconditiongratuiteById,
  updateconditiongratuiteById,
} = require('./conditiongratuite.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/conditiongratuites/- Get all conditiongratuites */
/**
 * @swagger
 * /conditiongratuites:
 *  get:                                     #GET ALL conditiongratuites
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditiongratuites
 *    summary: "Get conditiongratuites"
 *    description: Returns a single conditiongratuite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single conditiongratuite
 */
router.get('/', /* checkToken ,*/ getconditiongratuites);

/** POST /api/v1/conditiongratuites/ - Create new conditiongratuite */
/**
 * @swagger
 * /conditiongratuites:
 *  post:                                       #CREATE conditiongratuite
 *    tags:
 *      - conditiongratuites
 *    summary: "Create conditiongratuite"
 *    description: create a single conditiongratuite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: conditiongratuite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditiongratuite'
 *    responses:
 *      200:
 *        description: conditiongratuite created
 */
router.post('/', addconditiongratuite);

/** GET /api/v1/conditiongratuites/:id - Get single conditiongratuite by id */
/**
 *  @swagger
 * /conditiongratuites/{id}:
 *  get:                                            #GET SINGLE conditiongratuite
 *    tags:
 *      - conditiongratuites
 *    summary: "Get Single conditiongratuite"
 *    description: Update a single conditiongratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditiongratuite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: conditiongratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditiongratuite'
 */
router.get('/:id', checkToken, getconditiongratuiteById);

/** PATCH /api/v1/conditiongratuites/:id - Update conditiongratuite by id */
/**
 * @swagger
 * /conditiongratuites/{id}:
 *  patch:                                           #UPDATE conditiongratuite
 *    tags:
 *      - conditiongratuites
 *    summary: "Update Single conditiongratuite"
 *    description: Update a single conditiongratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditiongratuite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: conditiongratuite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditiongratuite'
 *    responses:
 *      200:
 *        description: conditiongratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditiongratuite'
 */
router.patch('/:id', updateconditiongratuiteById);

/** DELETE /api/v1/conditiongratuites/:id - Delete conditiongratuite by id */
/**
 * @swagger
 * /conditiongratuites/{id}:
 *  delete:                                     #DELETE SINGLE conditiongratuite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditiongratuites
 *    summary: "Delete Single conditiongratuite"
 *    description: Delete a single conditiongratuite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditiongratuite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addconditiongratuite"
 *    responses:
 *      200:
 *        description: conditiongratuite Deleted
 */
router.delete('/:id', deleteconditiongratuiteById);

module.exports = router;
