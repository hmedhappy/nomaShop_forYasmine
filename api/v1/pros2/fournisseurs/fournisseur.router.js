const {
  getfournisseurs,
  getfournisseurById,
  addfournisseur,
  deletefournisseurById,
  updatefournisseurById,
} = require('./fournisseur.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/fournisseurs/- Get all fournisseurs */
/**
 * @swagger
 * /fournisseurs:
 *  get:                                     #GET ALL fournisseurs
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fournisseurs
 *    summary: "Get fournisseurs"
 *    description: Returns a single fournisseur based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single fournisseur
 */
router.get('/', /* checkToken ,*/ getfournisseurs);

/** POST /api/v1/fournisseurs/ - Create new fournisseur */
/**
 * @swagger
 * /fournisseurs:
 *  post:                                       #CREATE fournisseur
 *    tags:
 *      - fournisseurs
 *    summary: "Create fournisseur"
 *    description: create a single fournisseur
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: fournisseur object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfournisseur'
 *    responses:
 *      200:
 *        description: fournisseur created
 */
router.post('/', addfournisseur);

/** GET /api/v1/fournisseurs/:id - Get single fournisseur by id */
/**
 *  @swagger
 * /fournisseurs/{id}:
 *  get:                                            #GET SINGLE fournisseur
 *    tags:
 *      - fournisseurs
 *    summary: "Get Single fournisseur"
 *    description: Update a single fournisseur based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fournisseur"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: fournisseur Updated
 *        schema:
 *            $ref: '#/definitions/Addfournisseur'
 */
router.get('/:id', checkToken, getfournisseurById);

/** PATCH /api/v1/fournisseurs/:id - Update fournisseur by id */
/**
 * @swagger
 * /fournisseurs/{id}:
 *  patch:                                           #UPDATE fournisseur
 *    tags:
 *      - fournisseurs
 *    summary: "Update Single fournisseur"
 *    description: Update a single fournisseur based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fournisseur"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: fournisseur object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfournisseur'
 *    responses:
 *      200:
 *        description: fournisseur Updated
 *        schema:
 *            $ref: '#/definitions/Addfournisseur'
 */
router.patch('/:id', updatefournisseurById);

/** DELETE /api/v1/fournisseurs/:id - Delete fournisseur by id */
/**
 * @swagger
 * /fournisseurs/{id}:
 *  delete:                                     #DELETE SINGLE fournisseur
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fournisseurs
 *    summary: "Delete Single fournisseur"
 *    description: Delete a single fournisseur based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fournisseur"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addfournisseur"
 *    responses:
 *      200:
 *        description: fournisseur Deleted
 */
router.delete('/:id', deletefournisseurById);

module.exports = router;
