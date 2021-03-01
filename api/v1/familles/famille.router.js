const {
  getfamilles,
  getfamilleById,
  addfamille,
  deletefamilleById,
  updatefamilleById,
} = require('./famille.controller');
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
 * /familles:                                 #GET ALL familles
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - familles
 *    summary: "Get familles"
 *    description: Returns a single famille based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single famille
 *
 *  post:                                       #CREATE famille
 *    tags:
 *      - familles
 *    summary: "Create famille"
 *    description: create a single famille
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: famille object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfamille'
 *    responses:
 *      200:
 *        description: famille created
 *
 * /familles/{id}:                                 #UPDATE famille
 *  get:
 *    tags:
 *      - familles
 *    summary: "Get Single famille"
 *    description: Update a single famille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the famille"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: famille Updated
 *        schema:
 *            $ref: '#/definitions/Addfamilles'
 *
 *  patch:
 *    tags:
 *      - familles
 *    summary: "Update Single famille"
 *    description: Update a single famille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the famille"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: famille object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfamille'
 *    responses:
 *      200:
 *        description: famille Updated
 *        schema:
 *            $ref: '#/definitions/Addfamilles'
 *
 *
 *  delete:                                      #DELTE famille
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - familles
 *    summary: "Delete Single famille"
 *    description: Delete a single famille based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the famille"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addfamilles"
 *    responses:
 *      200:
 *        description: famille Deleted
 *
 */

router.get('/', /* checkToken, */ getfamilles);
/** POST /api/v1/users/register - Create new user */
router.post('/', addfamille);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getfamilleById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletefamilleById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatefamilleById);

module.exports = router;
