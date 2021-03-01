const {
  getgratuites,
  getgratuiteById,
  addgratuite,
  deletegratuiteById,
  updategratuiteById,
} = require('./gratuite.controller');
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
 * /gratuites:                                 #GET ALL gratuites
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gratuites
 *    summary: "Get gratuites"
 *    description: Returns a single gratuite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single gratuite
 *
 *  post:                                       #CREATE gratuite
 *    tags:
 *      - gratuites
 *    summary: "Create gratuite"
 *    description: create a single gratuite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: gratuite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgratuite'
 *    responses:
 *      200:
 *        description: gratuite created
 *
 * /gratuites/{id}:                                 #UPDATE gratuite
 *  get:
 *    tags:
 *      - gratuites
 *    summary: "Get Single gratuite"
 *    description: Update a single gratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gratuite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: gratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addgratuites'
 *
 *  patch:
 *    tags:
 *      - gratuites
 *    summary: "Update Single gratuite"
 *    description: Update a single gratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gratuite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: gratuite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgratuite'
 *    responses:
 *      200:
 *        description: gratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addgratuites'
 *
 *
 *  delete:                                      #DELTE gratuite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gratuites
 *    summary: "Delete Single gratuite"
 *    description: Delete a single gratuite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gratuite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgratuites"
 *    responses:
 *      200:
 *        description: gratuite Deleted
 *
 */

router.get('/', /* checkToken, */ getgratuites);
/** POST /api/v1/users/register - Create new user */
router.post('/', addgratuite);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getgratuiteById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletegratuiteById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updategratuiteById);

module.exports = router;
