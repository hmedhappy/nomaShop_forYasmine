const {
  getconditiongratuites,
  getconditiongratuiteById,
  addconditiongratuite,
  deleteconditiongratuiteById,
  updateconditiongratuiteById,
} = require('./conditiongratuite.controller');
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
 * /conditiongratuites:                                 #GET ALL conditiongratuites
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditiongratuites
 *    summary: "Get conditiongratuites"
 *    description: Returns a single conditiongratuite based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single conditiongratuite
 *
 *  post:                                       #CREATE conditiongratuite
 *    tags:
 *      - conditiongratuites
 *    summary: "Create conditiongratuite"
 *    description: create a single conditiongratuite
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: conditiongratuite object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditiongratuite'
 *    responses:
 *      200:
 *        description: conditiongratuite created
 *
 * /conditiongratuites/{id}:                                 #UPDATE conditiongratuite
 *  get:
 *    tags:
 *      - conditiongratuites
 *    summary: "Get Single conditiongratuite"
 *    description: Update a single conditiongratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditiongratuite"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: conditiongratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditiongratuites'
 *
 *  patch:
 *    tags:
 *      - conditiongratuites
 *    summary: "Update Single conditiongratuite"
 *    description: Update a single conditiongratuite based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditiongratuite"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: conditiongratuite object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addconditiongratuite'
 *    responses:
 *      200:
 *        description: conditiongratuite Updated
 *        schema:
 *            $ref: '#/definitions/Addconditiongratuites'
 *
 *
 *  delete:                                      #DELTE conditiongratuite
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - conditiongratuites
 *    summary: "Delete Single conditiongratuite"
 *    description: Delete a single conditiongratuite based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the conditiongratuite"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addconditiongratuites"
 *    responses:
 *      200:
 *        description: conditiongratuite Deleted
 *
 */

router.get('/', /* checkToken, */ getconditiongratuites);
/** POST /api/v1/users/register - Create new user */
router.post('/', addconditiongratuite);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getconditiongratuiteById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deleteconditiongratuiteById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updateconditiongratuiteById);

module.exports = router;
