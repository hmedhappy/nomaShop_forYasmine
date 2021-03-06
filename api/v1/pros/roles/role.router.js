const {
  getRoles,
  getRoleById,
  addRole,
  deleteRoleById,
  updateRoleById,
} = require('./Role.controller');
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
 * /roles:                                 #GET ALL roles
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - roles
 *    summary: "Get roles"
 *    description: Returns a single role based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single role
 *
 *  post:                                       #CREATE role
 *    tags:
 *      - roles
 *    summary: "Create role"
 *    description: create a single role
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: role object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addrole'
 *    responses:
 *      200:
 *        description: role created
 *
 * /roles/{id}:                                 #UPDATE role
 *  get:
 *    tags:
 *      - roles
 *    summary: "Get Single role"
 *    description: Update a single role based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the role"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: role Updated
 *        schema:
 *            $ref: '#/definitions/Addroles'
 *
 *  patch:
 *    tags:
 *      - roles
 *    summary: "Update Single role"
 *    description: Update a single role based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the role"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: role object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addrole'
 *    responses:
 *      200:
 *        description: role Updated
 *        schema:
 *            $ref: '#/definitions/Addroles'
 *
 *
 *  delete:                                      #DELTE role
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - roles
 *    summary: "Delete Single role"
 *    description: Delete a single role based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the role"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addroles"
 *    responses:
 *      200:
 *        description: role Deleted
 *
 */

router.get('/', /* checkToken, */ getRoles);
/** POST /api/v1/users/register - Create new user */
router.post('/', addRole);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getRoleById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deleteRoleById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updateRoleById);

module.exports = router;
