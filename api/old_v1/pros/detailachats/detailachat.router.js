const {
  getdetailachats,
  getdetailachatById,
  adddetailachat,
  deletedetailachatById,
  updatedetailachatById,
} = require('./detailachat.controller');
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
 * /detailachats:                                 #GET ALL detailachats
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - detailachats
 *    summary: "Get detailachats"
 *    description: Returns a single detailachat based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single detailachat
 *
 *  post:                                       #CREATE detailachat
 *    tags:
 *      - detailachats
 *    summary: "Create detailachat"
 *    description: create a single detailachat
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: detailachat object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Adddetailachat'
 *    responses:
 *      200:
 *        description: detailachat created
 *
 * /detailachats/{id}:                                 #UPDATE detailachat
 *  get:
 *    tags:
 *      - detailachats
 *    summary: "Get Single detailachat"
 *    description: Update a single detailachat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: detailachat Updated
 *        schema:
 *            $ref: '#/definitions/Adddetailachats'
 *
 *  patch:
 *    tags:
 *      - detailachats
 *    summary: "Update Single detailachat"
 *    description: Update a single detailachat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: detailachat object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Adddetailachat'
 *    responses:
 *      200:
 *        description: detailachat Updated
 *        schema:
 *            $ref: '#/definitions/Adddetailachats'
 *
 *
 *  delete:                                      #DELTE detailachat
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - detailachats
 *    summary: "Delete Single detailachat"
 *    description: Delete a single detailachat based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Adddetailachats"
 *    responses:
 *      200:
 *        description: detailachat Deleted
 *
 */

router.get('/', /* checkToken, */ getdetailachats);
/** POST /api/v1/users/register - Create new user */
router.post('/', adddetailachat);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getdetailachatById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletedetailachatById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatedetailachatById);

module.exports = router;
