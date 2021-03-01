const {
  getconditionfidelites,
  getconditionfideliteById,
  addconditionfidelite,
  deleteconditionfideliteById,
  updateconditionfideliteById,
} = require('./conditionfidelite.controller');
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
 * /conditionfidelites:                                 #GET ALL conditionfidelites
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditionfidelites
 *    summary: "Get conditionfidelites"
 *    description: Returns a single conditionfidelite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single conditionfidelite
 *
 *  post:                                       #CREATE conditionfidelite
 *    tags:
 *      - conditionfidelites
 *    summary: "Create conditionfidelite"
 *    description: create a single conditionfidelite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: conditionfidelite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditionfidelite'
 *    responses:
 *      200:
 *        description: conditionfidelite created
 *
 * /conditionfidelites/{id}:                                 #UPDATE conditionfidelite
 *  get:
 *    tags:
 *      - conditionfidelites
 *    summary: "Get Single conditionfidelite"
 *    description: Update a single conditionfidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditionfidelite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: conditionfidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditionfidelites'
 *
 *  patch:
 *    tags:
 *      - conditionfidelites
 *    summary: "Update Single conditionfidelite"
 *    description: Update a single conditionfidelite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditionfidelite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: conditionfidelite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditionfidelite'
 *    responses:
 *      200:
 *        description: conditionfidelite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditionfidelites'
 *
 *
 *  delete:                                      #DELTE conditionfidelite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditionfidelites
 *    summary: "Delete Single conditionfidelite"
 *    description: Delete a single conditionfidelite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditionfidelite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addconditionfidelites"
 *    responses:
 *      200:
 *        description: conditionfidelite Deleted
 *
 */

router.get('/', /* checkToken, */ getconditionfidelites);
/** POST /api/v1/users/register - Create new user */
router.post('/', addconditionfidelite);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getconditionfideliteById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deleteconditionfideliteById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updateconditionfideliteById);

module.exports = router;
