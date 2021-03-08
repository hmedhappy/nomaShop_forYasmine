const {
  getgroupes,
  getgroupeById,
  addgroupe,
  deletegroupeById,
  updategroupeById,
} = require('./groupe.controller');
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
 * /groupes:                                 #GET ALL groupes
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - groupes
 *    summary: "Get groupes"
 *    description: Returns a single groupe based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single groupe
 *
 *  post:                                       #CREATE groupe
 *    tags:
 *      - groupes
 *    summary: "Create groupe"
 *    description: create a single groupe
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: groupe object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgroupe'
 *    responses:
 *      200:
 *        description: groupe created
 *
 * /groupes/{id}:                                 #UPDATE groupe
 *  get:
 *    tags:
 *      - groupes
 *    summary: "Get Single groupe"
 *    description: Update a single groupe based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the groupe"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: groupe Updated
 *        schema:
 *            $ref: '#/definitions/Addgroupes'
 *
 *  patch:
 *    tags:
 *      - groupes
 *    summary: "Update Single groupe"
 *    description: Update a single groupe based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the groupe"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: groupe object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgroupe'
 *    responses:
 *      200:
 *        description: groupe Updated
 *        schema:
 *            $ref: '#/definitions/Addgroupes'
 *
 *
 *  delete:                                      #DELTE groupe
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - groupes
 *    summary: "Delete Single groupe"
 *    description: Delete a single groupe based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the groupe"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgroupes"
 *    responses:
 *      200:
 *        description: groupe Deleted
 *
 */

router.get('/', /* checkToken, */ getgroupes);
/** POST /api/v1/users/register - Create new user */
router.post('/', addgroupe);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getgroupeById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletegroupeById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updategroupeById);

module.exports = router;
