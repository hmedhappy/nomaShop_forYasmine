const {
  getmarques,
  getmarqueById,
  addmarque,
  deletemarqueById,
  updatemarqueById,
} = require('./marque.controller');
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
 * /marques:                                 #GET ALL marques
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - marques
 *    summary: "Get marques"
 *    description: Returns a single marque based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single marque
 *
 *  post:                                       #CREATE marque
 *    tags:
 *      - marques
 *    summary: "Create marque"
 *    description: create a single marque
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: marque object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addmarque'
 *    responses:
 *      200:
 *        description: marque created
 *
 * /marques/{id}:                                 #UPDATE marque
 *  get:
 *    tags:
 *      - marques
 *    summary: "Get Single marque"
 *    description: Update a single marque based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the marque"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: marque Updated
 *        schema:
 *            $ref: '#/definitions/Addmarques'
 *
 *  patch:
 *    tags:
 *      - marques
 *    summary: "Update Single marque"
 *    description: Update a single marque based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the marque"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: marque object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addmarque'
 *    responses:
 *      200:
 *        description: marque Updated
 *        schema:
 *            $ref: '#/definitions/Addmarques'
 *
 *
 *  delete:                                      #DELTE marque
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - marques
 *    summary: "Delete Single marque"
 *    description: Delete a single marque based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the marque"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addmarques"
 *    responses:
 *      200:
 *        description: marque Deleted
 *
 */

router.get('/', /* checkToken, */ getmarques);
/** POST /api/v1/users/register - Create new user */
router.post('/', addmarque);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getmarqueById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletemarqueById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatemarqueById);

module.exports = router;
