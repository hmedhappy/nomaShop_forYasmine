const {
  getfidelites,
  getfideliteById,
  addfidelite,
  deletefideliteById,
  updatefideliteById,
} = require('./fidelite.controller');
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
 * /fidelites:                                 #GET ALL fidelites
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fidelites
 *    summary: "Get fidelites"
 *    description: Returns a single fidelite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single fidelite
 *
 *  post:                                       #CREATE fidelite
 *    tags:
 *      - fidelites
 *    summary: "Create fidelite"
 *    description: create a single fidelite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: fidelite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfidelite'
 *    responses:
 *      200:
 *        description: fidelite created
 *
 * /fidelites/{id}:                                 #UPDATE fidelite
 *  get:
 *    tags:
 *      - fidelites
 *    summary: "Get Single fidelite"
 *    description: Update a single fidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fidelite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: fidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addfidelites'
 *
 *  patch:
 *    tags:
 *      - fidelites
 *    summary: "Update Single fidelite"
 *    description: Update a single fidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fidelite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: fidelite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfidelite'
 *    responses:
 *      200:
 *        description: fidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addfidelites'
 *
 *
 *  delete:                                      #DELTE fidelite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fidelites
 *    summary: "Delete Single fidelite"
 *    description: Delete a single fidelite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fidelite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addfidelites"
 *    responses:
 *      200:
 *        description: fidelite Deleted
 *
 */

router.get('/', /* checkToken, */ getfidelites);
/** POST /api/v1/users/register - Create new user */
router.post('/', addfidelite);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getfideliteById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletefideliteById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatefideliteById);

module.exports = router;
