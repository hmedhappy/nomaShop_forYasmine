const {
  getcommentaires,
  getcommentaireById,
  addcommentaire,
  deletecommentaireById,
  updatecommentaireById,
} = require('./commentaire.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/commentaires/- Get all commentaires */
/**
 * @swagger
 * /commentaires:
 *  get:                                     #GET ALL commentaires
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - commentaires
 *    summary: "Get commentaires"
 *    description: Returns a single commentaire based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single commentaire
 */
router.get('/', /* checkToken ,*/ getcommentaires);

/** POST /api/v1/commentaires/ - Create new commentaire */
/**
 * @swagger
 * /commentaires:
 *  post:                                       #CREATE commentaire
 *    tags:
 *      - commentaires
 *    summary: "Create commentaire"
 *    description: create a single commentaire
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: commentaire object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addcommentaire'
 *    responses:
 *      200:
 *        description: commentaire created
 */
router.post('/', addcommentaire);

/** GET /api/v1/commentaires/:id - Get single commentaire by id */
/**
 *  @swagger
 * /commentaires/{id}:
 *  get:                                            #GET SINGLE commentaire
 *    tags:
 *      - commentaires
 *    summary: "Get Single commentaire"
 *    description: Update a single commentaire based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the commentaire"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: commentaire Updated
 *        schema:
 *            $ref: '#/definitions/Addcommentaire'
 */
router.get('/:id', checkToken, getcommentaireById);

/** PATCH /api/v1/commentaires/:id - Update commentaire by id */
/**
 * @swagger
 * /commentaires/{id}:
 *  patch:                                           #UPDATE commentaire
 *    tags:
 *      - commentaires
 *    summary: "Update Single commentaire"
 *    description: Update a single commentaire based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the commentaire"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: commentaire object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addcommentaire'
 *    responses:
 *      200:
 *        description: commentaire Updated
 *        schema:
 *            $ref: '#/definitions/Addcommentaire'
 */
router.patch('/:id', updatecommentaireById);

/** DELETE /api/v1/commentaires/:id - Delete commentaire by id */
/**
 * @swagger
 * /commentaires/{id}:
 *  delete:                                     #DELETE SINGLE commentaire
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - commentaires
 *    summary: "Delete Single commentaire"
 *    description: Delete a single commentaire based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the commentaire"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addcommentaire"
 *    responses:
 *      200:
 *        description: commentaire Deleted
 */
router.delete('/:id', deletecommentaireById);

module.exports = router;
