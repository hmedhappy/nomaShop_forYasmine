const {
  getsousFamilles,
  getsousFamilleById,
  addsousFamille,
  deletesousFamilleById,
  updatesousFamilleById,
} = require('./sousFamille.controller');
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
 * /sousFamilles:                                 #GET ALL sousFamilles
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - sousFamilles
 *    summary: "Get sousFamilles"
 *    description: Returns a single sousFamille based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single sousFamille
 *
 *  post:                                       #CREATE sousFamille
 *    tags:
 *      - sousFamilles
 *    summary: "Create sousFamille"
 *    description: create a single sousFamille
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: sousFamille object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AddsousFamille'
 *    responses:
 *      200:
 *        description: sousFamille created
 *
 * /sousFamilles/{id}:                                 #UPDATE sousFamille
 *  get:
 *    tags:
 *      - sousFamilles
 *    summary: "Get Single sousFamille"
 *    description: Update a single sousFamille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the sousFamille"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: sousFamille Updated
 *        schema:
 *            $ref: '#/definitions/AddsousFamilles'
 *
 *  patch:
 *    tags:
 *      - sousFamilles
 *    summary: "Update Single sousFamille"
 *    description: Update a single sousFamille based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the sousFamille"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: sousFamille object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AddsousFamille'
 *    responses:
 *      200:
 *        description: sousFamille Updated
 *        schema:
 *            $ref: '#/definitions/AddsousFamilles'
 *
 *
 *  delete:                                      #DELTE sousFamille
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - sousFamilles
 *    summary: "Delete Single sousFamille"
 *    description: Delete a single sousFamille based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the sousFamille"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/AddsousFamilles"
 *    responses:
 *      200:
 *        description: sousFamille Deleted
 *
 */

router.get('/', /* checkToken, */ getsousFamilles);
/** POST /api/v1/users/register - Create new user */
router.post('/', addsousFamille);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getsousFamilleById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletesousFamilleById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatesousFamilleById);

module.exports = router;
