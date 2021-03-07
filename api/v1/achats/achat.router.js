const {
  getachats,
  getachatById,
  addachat,
  deleteachatById,
  updateachatById,
} = require('./achat.controller');
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
 * /achats:                                 #GET ALL achats
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - achats
 *    summary: "Get achats"
 *    description: Returns a single achat based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single achat
 */
router.get('/', /* checkToken, */ getachats);

/** 
 * @swagger
 * /achats:
 *  post:                                       #CREATE achat
 *    tags:
 *      - achats
 *    summary: "Create achat"
 *    description: create a single achat
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: achat object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addachat'
 *    responses:
 *      200:
 *        description: achat created
 */
router.post('/', addachat);

/** 
 * @swagger
 * /achats/{id}:                                 #GET SINGLE achat
 *  get:
 *    tags:
 *      - achats
 *    summary: "Get Single achat"
 *    description: Update a single achat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the achat"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: achat Updated
 *        schema:
 *            $ref: '#/definitions/Addachats'
 */
router.get('/:id' /* , checkToken */, getachatById);

/** 
 * @swagger
 * /achats/{id}:
 *  patch:                                     #UPDATE achat
 *    tags:
 *      - achats
 *    summary: "Update Single achat"
 *    description: Update a single achat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the achat"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: achat object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addachat'
 *    responses:
 *      200:
 *        description: achat Updated
 *        schema:
 *            $ref: '#/definitions/Addachats'
 */
router.patch('/:id', updateachatById);

/** 
 * @swagger
 * /achats/{id}:
 *  delete:                                      #DELETE achat
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - achats
 *    summary: "Delete Single achat"
 *    description: Delete a single achat based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the achat"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addachats"
 *    responses:
 *      200:
 *        description: achat Deleted
 *
 */
router.delete('/:id', deleteachatById);


/** POST /api/v1/users/register - Create new user */
/** GET /api/v1/users/:id - Get user by id */
/** POST /api/v1/users/login - Authenticate user */
/** POST /api/v1/users/login - Authenticate user */

module.exports = router;
