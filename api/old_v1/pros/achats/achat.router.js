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
 *
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
 *
 * /achats/{id}:                                 #UPDATE achat
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
 *
 *  patch:
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
 *
 *
 *  delete:                                      #DELTE achat
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

router.get('/', /* checkToken, */ getachats);
/** POST /api/v1/users/register - Create new user */
router.post('/', addachat);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getachatById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deleteachatById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updateachatById);

module.exports = router;
