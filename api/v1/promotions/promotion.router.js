const {
  getpromotions,
  getpromotionById,
  addpromotion,
  deletepromotionById,
  updatepromotionById,
} = require('./promotion.controller');
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
 * /promotions:                                 #GET ALL promotions
 *  get:
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
 *
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
 *
 * /promotions/{id}:                                 #UPDATE promotion
 *  get:
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
 *            $ref: '#/definitions/Addpromotions'
 *
 *  patch:
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
 *            $ref: '#/definitions/Addpromotions'
 *
 *
 *  delete:                                      #DELTE promotion
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
 *          $ref: "#/definitions/Addpromotions"
 *    responses:
 *      200:
 *        description: promotion Deleted
 *
 */

router.get('/', /* checkToken, */ getpromotions);
/** POST /api/v1/users/register - Create new user */
router.post('/', addpromotion);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getpromotionById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletepromotionById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatepromotionById);

module.exports = router;
