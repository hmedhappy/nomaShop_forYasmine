const {
  getpermissions,
  getpermissionById,
  addpermission,
  deletepermissionById,
  updatepermissionById,
} = require('./permission.controller');
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
 * /permissions:                                 #GET ALL permissions
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - permissions
 *    summary: "Get permissions"
 *    description: Returns a single permission based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single permission
 *
 *  post:                                       #CREATE permission
 *    tags:
 *      - permissions
 *    summary: "Create permission"
 *    description: create a single permission
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: permission object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addpermission'
 *    responses:
 *      200:
 *        description: permission created
 *
 * /permissions/{id}:                                 #UPDATE permission
 *  get:
 *    tags:
 *      - permissions
 *    summary: "Get Single permission"
 *    description: Update a single permission based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the permission"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: permission Updated
 *        schema:
 *            $ref: '#/definitions/Addpermissions'
 *
 *  patch:
 *    tags:
 *      - permissions
 *    summary: "Update Single permission"
 *    description: Update a single permission based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the permission"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: permission object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addpermission'
 *    responses:
 *      200:
 *        description: permission Updated
 *        schema:
 *            $ref: '#/definitions/Addpermissions'
 *
 *
 *  delete:                                      #DELTE permission
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - permissions
 *    summary: "Delete Single permission"
 *    description: Delete a single permission based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the permission"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addpermissions"
 *    responses:
 *      200:
 *        description: permission Deleted
 *
 */

router.get('/', /* checkToken, */ getpermissions);
/** POST /api/v1/users/register - Create new user */
router.post('/', addpermission);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getpermissionById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletepermissionById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatepermissionById);

module.exports = router;
