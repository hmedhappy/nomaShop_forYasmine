const {
  getpromotions,
  getpromotionById,
  addpromotion,
  deletepromotionById,
  updatepromotionById,
} = require('./promotion.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/promotions/- Get all promotions */
/**
 * @swagger
 * /promotions:
 *  get:                                     #GET ALL promotions
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - promotions
 *    summary: "Get promotions"
 *    description: Returns a single promotion based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single promotion
 */
router.get('/', /* checkToken ,*/ getpromotions);

/** POST /api/v1/promotions/ - Create new promotion */
/**
 * @swagger
 * /promotions:
 *  post:                                       #CREATE promotion
 *    tags:
 *      - promotions
 *    summary: "Create promotion"
 *    description: create a single promotion
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: promotion object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addpromotion'
 *    responses:
 *      200:
 *        description: promotion created
 */
router.post('/', addpromotion);

/** GET /api/v1/promotions/:id - Get single promotion by id */
/**
 *  @swagger
 * /promotions/{id}:
 *  get:                                            #GET SINGLE promotion
 *    tags:
 *      - promotions
 *    summary: "Get Single promotion"
 *    description: Update a single promotion based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the promotion"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: promotion Updated
 *        schema:
 *            $ref: '#/definitions/Addpromotion'
 */
router.get('/:id', checkToken, getpromotionById);

/** PATCH /api/v1/promotions/:id - Update promotion by id */
/**
 * @swagger
 * /promotions/{id}:
 *  patch:                                           #UPDATE promotion
 *    tags:
 *      - promotions
 *    summary: "Update Single promotion"
 *    description: Update a single promotion based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the promotion"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: promotion object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addpromotion'
 *    responses:
 *      200:
 *        description: promotion Updated
 *        schema:
 *            $ref: '#/definitions/Addpromotion'
 */
router.patch('/:id', updatepromotionById);

/** DELETE /api/v1/promotions/:id - Delete promotion by id */
/**
 * @swagger
 * /promotions/{id}:
 *  delete:                                     #DELETE SINGLE promotion
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - promotions
 *    summary: "Delete Single promotion"
 *    description: Delete a single promotion based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the promotion"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addpromotion"
 *    responses:
 *      200:
 *        description: promotion Deleted
 */
router.delete('/:id', deletepromotionById);

module.exports = router;
