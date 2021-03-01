const {
  getstocks,
  getstockById,
  addstock,
  deletestockById,
  updatestockById,
} = require('./stock.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();
const myMulter = require('../../../middleware/multer');
const rateLimit = require('express-rate-limit');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

/** POST /api/v1/users/register - Create new user */

/**
 * @swagger
 * /stocks:                                 #GET ALL stocks
 *  get:
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
 *
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
 *
 * /stocks/{id}:                                 #UPDATE stock
 *  get:
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
 *            $ref: '#/definitions/Addstocks'
 *
 *  patch:
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
 *            $ref: '#/definitions/Addstocks'
 *
 *
 *  delete:                                      #DELTE stock
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
 *          $ref: "#/definitions/Addstocks"
 *    responses:
 *      200:
 *        description: stock Deleted
 *
 */

router.get('/', /* checkToken, */ getstocks);
/** POST /api/v1/users/register - Create new user */
router.post('/', addstock);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getstockById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletestockById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatestockById);

module.exports = router;
