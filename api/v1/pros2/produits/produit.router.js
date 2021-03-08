const {
  getproduits,
  getproduitById,
  addproduit,
  deleteproduitById,
  updateproduitById,
} = require('./produit.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/produits/- Get all produits */
/**
 * @swagger
 * /produits:
 *  get:                                     #GET ALL produits
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - produits
 *    summary: "Get produits"
 *    description: Returns a single produit based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single produit
 */
router.get('/', /* checkToken ,*/ getproduits);

/** POST /api/v1/produits/ - Create new produit */
/**
 * @swagger
 * /produits:
 *  post:                                       #CREATE produit
 *    tags:
 *      - produits
 *    summary: "Create produit"
 *    description: create a single produit
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: produit object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addproduit'
 *    responses:
 *      200:
 *        description: produit created
 */
router.post('/', addproduit);

/** GET /api/v1/produits/:id - Get single produit by id */
/**
 *  @swagger
 * /produits/{id}:
 *  get:                                            #GET SINGLE produit
 *    tags:
 *      - produits
 *    summary: "Get Single produit"
 *    description: Update a single produit based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the produit"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: produit Updated
 *        schema:
 *            $ref: '#/definitions/Addproduit'
 */
router.get('/:id', checkToken, getproduitById);

/** PATCH /api/v1/produits/:id - Update produit by id */
/**
 * @swagger
 * /produits/{id}:
 *  patch:                                           #UPDATE produit
 *    tags:
 *      - produits
 *    summary: "Update Single produit"
 *    description: Update a single produit based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the produit"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: produit object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addproduit'
 *    responses:
 *      200:
 *        description: produit Updated
 *        schema:
 *            $ref: '#/definitions/Addproduit'
 */
router.patch('/:id', updateproduitById);

/** DELETE /api/v1/produits/:id - Delete produit by id */
/**
 * @swagger
 * /produits/{id}:
 *  delete:                                     #DELETE SINGLE produit
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - produits
 *    summary: "Delete Single produit"
 *    description: Delete a single produit based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the produit"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addproduit"
 *    responses:
 *      200:
 *        description: produit Deleted
 */
router.delete('/:id', deleteproduitById);

module.exports = router;
