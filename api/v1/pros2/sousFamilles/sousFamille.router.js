const {
  getsousfamilles,
  getsousfamilleById,
  addsousfamille,
  deletesousfamilleById,
  updatesousfamilleById,
} = require('./sousfamille.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/sousfamilles/- Get all sousfamilles */
/**
 * @swagger
 * /sousfamilles:
 *  get:                                     #GET ALL sousfamilles
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - sousfamilles
 *    summary: "Get sousfamilles"
 *    description: Returns a single sousfamille based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single sousfamille
 */
router.get('/', /* checkToken ,*/ getsousfamilles);

/** POST /api/v1/sousfamilles/ - Create new sousfamille */
/**
 * @swagger
 * /sousfamilles:
 *  post:                                       #CREATE sousfamille
 *    tags:
 *      - sousfamilles
 *    summary: "Create sousfamille"
 *    description: create a single sousfamille
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: sousfamille object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addsousfamille'
 *    responses:
 *      200:
 *        description: sousfamille created
 */
router.post('/', addsousfamille);

/** GET /api/v1/sousfamilles/:id - Get single sousfamille by id */
/**
 *  @swagger
 * /sousfamilles/{id}:
 *  get:                                            #GET SINGLE sousfamille
 *    tags:
 *      - sousfamilles
 *    summary: "Get Single sousfamille"
 *    description: Update a single sousfamille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the sousfamille"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: sousfamille Updated
 *        schema:
 *            $ref: '#/definitions/Addsousfamille'
 */
router.get('/:id', checkToken, getsousfamilleById);

/** PATCH /api/v1/sousfamilles/:id - Update sousfamille by id */
/**
 * @swagger
 * /sousfamilles/{id}:
 *  patch:                                           #UPDATE sousfamille
 *    tags:
 *      - sousfamilles
 *    summary: "Update Single sousfamille"
 *    description: Update a single sousfamille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the sousfamille"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: sousfamille object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addsousfamille'
 *    responses:
 *      200:
 *        description: sousfamille Updated
 *        schema:
 *            $ref: '#/definitions/Addsousfamille'
 */
router.patch('/:id', updatesousfamilleById);

/** DELETE /api/v1/sousfamilles/:id - Delete sousfamille by id */
/**
 * @swagger
 * /sousfamilles/{id}:
 *  delete:                                     #DELETE SINGLE sousfamille
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - sousfamilles
 *    summary: "Delete Single sousfamille"
 *    description: Delete a single sousfamille based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the sousfamille"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addsousfamille"
 *    responses:
 *      200:
 *        description: sousfamille Deleted
 */
router.delete('/:id', deletesousfamilleById);

module.exports = router;
