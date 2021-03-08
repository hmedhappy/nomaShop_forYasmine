const {
  getgrossistes,
  getgrossisteById,
  addgrossiste,
  deletegrossisteById,
  updategrossisteById,
} = require('./grossiste.controller');
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
 * /grossistes:                                 #GET ALL grossistes
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - grossistes
 *    summary: "Get grossistes"
 *    description: Returns a single grossiste based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single grossiste
 *
 *  post:                                       #CREATE grossiste
 *    tags:
 *      - grossistes
 *    summary: "Create grossiste"
 *    description: create a single grossiste
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: grossiste object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgrossiste'
 *    responses:
 *      200:
 *        description: grossiste created
 *
 * /grossistes/{id}:                                 #UPDATE grossiste
 *  get:
 *    tags:
 *      - grossistes
 *    summary: "Get Single grossiste"
 *    description: Update a single grossiste based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the grossiste"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: grossiste Updated
 *        schema:
 *            $ref: '#/definitions/Addgrossistes'
 *
 *  patch:
 *    tags:
 *      - grossistes
 *    summary: "Update Single grossiste"
 *    description: Update a single grossiste based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the grossiste"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: grossiste object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addgrossiste'
 *    responses:
 *      200:
 *        description: grossiste Updated
 *        schema:
 *            $ref: '#/definitions/Addgrossistes'
 *
 *
 *  delete:                                      #DELTE grossiste
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - grossistes
 *    summary: "Delete Single grossiste"
 *    description: Delete a single grossiste based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the grossiste"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addgrossistes"
 *    responses:
 *      200:
 *        description: grossiste Deleted
 *
 */

router.get('/', /* checkToken, */ getgrossistes);
/** POST /api/v1/users/register - Create new user */
router.post('/', addgrossiste);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getgrossisteById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletegrossisteById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updategrossisteById);

module.exports = router;
