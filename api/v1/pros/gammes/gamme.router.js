const {
  getgammes,
  getgammeById,
  addgamme,
  deletegammeById,
  updategammeById,
} = require('./gamme.controller');
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
 * /gammes:                                 #GET ALL gammes
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gammes
 *    summary: "Get gammes"
 *    description: Returns a single gamme based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single gamme
 *
 *  post:                                       #CREATE gamme
 *    tags:
 *      - gammes
 *    summary: "Create gamme"
 *    description: create a single gamme
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: gamme object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgamme'
 *    responses:
 *      200:
 *        description: gamme created
 *
 * /gammes/{id}:                                 #UPDATE gamme
 *  get:
 *    tags:
 *      - gammes
 *    summary: "Get Single gamme"
 *    description: Update a single gamme based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gamme"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: gamme Updated
 *        schema:
 *            $ref: '#/definitions/Addgammes'
 *
 *  patch:
 *    tags:
 *      - gammes
 *    summary: "Update Single gamme"
 *    description: Update a single gamme based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gamme"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: gamme object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgamme'
 *    responses:
 *      200:
 *        description: gamme Updated
 *        schema:
 *            $ref: '#/definitions/Addgammes'
 *
 *
 *  delete:                                      #DELTE gamme
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - gammes
 *    summary: "Delete Single gamme"
 *    description: Delete a single gamme based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the gamme"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgammes"
 *    responses:
 *      200:
 *        description: gamme Deleted
 *
 */

router.get('/', /* checkToken, */ getgammes);
/** POST /api/v1/users/register - Create new user */
router.post('/', addgamme);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getgammeById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletegammeById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updategammeById);

module.exports = router;
