const {
  getstocks,
  getstockById,
  addstock,
  deletestockById,
  updatestockById,
} = require('./stock.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/stocks/- Get all stocks */
/**
 * @swagger
 * /stocks:
 *  get:                                     #GET ALL stocks
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - stocks
 *    summary: "Get stocks"
 *    description: Returns a single stock based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single stock
 */
router.get('/', /* checkToken ,*/ getstocks);

/** POST /api/v1/stocks/ - Create new stock */
/**
 * @swagger
 * /stocks:
 *  post:                                       #CREATE stock
 *    tags:
 *      - stocks
 *    summary: "Create stock"
 *    description: create a single stock
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: stock object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addstock'
 *    responses:
 *      200:
 *        description: stock created
 */
router.post('/', addstock);

/** GET /api/v1/stocks/:id - Get single stock by id */
/**
 *  @swagger
 * /stocks/{id}:
 *  get:                                            #GET SINGLE stock
 *    tags:
 *      - stocks
 *    summary: "Get Single stock"
 *    description: Update a single stock based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the stock"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: stock Updated
 *        schema:
 *            $ref: '#/definitions/Addstock'
 */
router.get('/:id', checkToken, getstockById);

/** PATCH /api/v1/stocks/:id - Update stock by id */
/**
 * @swagger
 * /stocks/{id}:
 *  patch:                                           #UPDATE stock
 *    tags:
 *      - stocks
 *    summary: "Update Single stock"
 *    description: Update a single stock based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the stock"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: stock object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addstock'
 *    responses:
 *      200:
 *        description: stock Updated
 *        schema:
 *            $ref: '#/definitions/Addstock'
 */
router.patch('/:id', updatestockById);

/** DELETE /api/v1/stocks/:id - Delete stock by id */
/**
 * @swagger
 * /stocks/{id}:
 *  delete:                                     #DELETE SINGLE stock
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - stocks
 *    summary: "Delete Single stock"
 *    description: Delete a single stock based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the stock"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addstock"
 *    responses:
 *      200:
 *        description: stock Deleted
 */
router.delete('/:id', deletestockById);

module.exports = router;
