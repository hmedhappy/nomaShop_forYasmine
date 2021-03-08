const {
  getgroupes,
  getgroupeById,
  addgroupe,
  deletegroupeById,
  updategroupeById,
} = require('./groupe.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/groupes/- Get all groupes */
/**
 * @swagger
 * /groupes:
 *  get:                                     #GET ALL groupes
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - groupes
 *    summary: "Get groupes"
 *    description: Returns a single groupe based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single groupe
 */
router.get('/', /* checkToken ,*/ getgroupes);

/** POST /api/v1/groupes/ - Create new groupe */
/**
 * @swagger
 * /groupes:
 *  post:                                       #CREATE groupe
 *    tags:
 *      - groupes
 *    summary: "Create groupe"
 *    description: create a single groupe
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: groupe object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgroupe'
 *    responses:
 *      200:
 *        description: groupe created
 */
router.post('/', addgroupe);

/** GET /api/v1/groupes/:id - Get single groupe by id */
/**
 *  @swagger
 * /groupes/{id}:
 *  get:                                            #GET SINGLE groupe
 *    tags:
 *      - groupes
 *    summary: "Get Single groupe"
 *    description: Update a single groupe based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the groupe"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: groupe Updated
 *        schema:
 *            $ref: '#/definitions/Addgroupe'
 */
router.get('/:id', checkToken, getgroupeById);

/** PATCH /api/v1/groupes/:id - Update groupe by id */
/**
 * @swagger
 * /groupes/{id}:
 *  patch:                                           #UPDATE groupe
 *    tags:
 *      - groupes
 *    summary: "Update Single groupe"
 *    description: Update a single groupe based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the groupe"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: groupe object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgroupe'
 *    responses:
 *      200:
 *        description: groupe Updated
 *        schema:
 *            $ref: '#/definitions/Addgroupe'
 */
router.patch('/:id', updategroupeById);

/** DELETE /api/v1/groupes/:id - Delete groupe by id */
/**
 * @swagger
 * /groupes/{id}:
 *  delete:                                     #DELETE SINGLE groupe
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - groupes
 *    summary: "Delete Single groupe"
 *    description: Delete a single groupe based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the groupe"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgroupe"
 *    responses:
 *      200:
 *        description: groupe Deleted
 */
router.delete('/:id', deletegroupeById);

module.exports = router;
