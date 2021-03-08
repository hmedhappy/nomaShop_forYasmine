const {
  getconditionfidelites,
  getconditionfideliteById,
  addconditionfidelite,
  deleteconditionfideliteById,
  updateconditionfideliteById,
} = require('./conditionfidelite.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/conditionfidelites/- Get all conditionfidelites */
/**
 * @swagger
 * /conditionfidelites:
 *  get:                                     #GET ALL conditionfidelites
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditionfidelites
 *    summary: "Get conditionfidelites"
 *    description: Returns a single conditionfidelite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single conditionfidelite
 */
router.get('/', /* checkToken ,*/ getconditionfidelites);

/** POST /api/v1/conditionfidelites/ - Create new conditionfidelite */
/**
 * @swagger
 * /conditionfidelites:
 *  post:                                       #CREATE conditionfidelite
 *    tags:
 *      - conditionfidelites
 *    summary: "Create conditionfidelite"
 *    description: create a single conditionfidelite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: conditionfidelite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditionfidelite'
 *    responses:
 *      200:
 *        description: conditionfidelite created
 */
router.post('/', addconditionfidelite);

/** GET /api/v1/conditionfidelites/:id - Get single conditionfidelite by id */
/**
 *  @swagger
 * /conditionfidelites/{id}:
 *  get:                                            #GET SINGLE conditionfidelite
 *    tags:
 *      - conditionfidelites
 *    summary: "Get Single conditionfidelite"
 *    description: Update a single conditionfidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditionfidelite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: conditionfidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditionfidelite'
 */
router.get('/:id', checkToken, getconditionfideliteById);

/** PATCH /api/v1/conditionfidelites/:id - Update conditionfidelite by id */
/**
 * @swagger
 * /conditionfidelites/{id}:
 *  patch:                                           #UPDATE conditionfidelite
 *    tags:
 *      - conditionfidelites
 *    summary: "Update Single conditionfidelite"
 *    description: Update a single conditionfidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditionfidelite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: conditionfidelite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditionfidelite'
 *    responses:
 *      200:
 *        description: conditionfidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditionfidelite'
 */
router.patch('/:id', updateconditionfideliteById);

/** DELETE /api/v1/conditionfidelites/:id - Delete conditionfidelite by id */
/**
 * @swagger
 * /conditionfidelites/{id}:
 *  delete:                                     #DELETE SINGLE conditionfidelite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditionfidelites
 *    summary: "Delete Single conditionfidelite"
 *    description: Delete a single conditionfidelite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditionfidelite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addconditionfidelite"
 *    responses:
 *      200:
 *        description: conditionfidelite Deleted
 */
router.delete('/:id', deleteconditionfideliteById);

module.exports = router;
