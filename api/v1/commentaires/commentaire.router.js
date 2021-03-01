const {
  getcommentaires,
  getcommentaireById,
  addcommentaire,
  deletecommentaireById,
  updatecommentaireById,
} = require('./commentaire.controller');
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
 * /commentaires:                                 #GET ALL commentaires
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - commentaires
 *    summary: "Get commentaires"
 *    description: Returns a single commentaire based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single commentaire
 *
 *  post:                                       #CREATE commentaire
 *    tags:
 *      - commentaires
 *    summary: "Create commentaire"
 *    description: create a single commentaire
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: commentaire object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addcommentaire'
 *    responses:
 *      200:
 *        description: commentaire created
 *
 * /commentaires/{id}:                                 #UPDATE commentaire
 *  get:
 *    tags:
 *      - commentaires
 *    summary: "Get Single commentaire"
 *    description: Update a single commentaire based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the commentaire"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: commentaire Updated
 *        schema:
 *            $ref: '#/definitions/Addcommentaires'
 *
 *  patch:
 *    tags:
 *      - commentaires
 *    summary: "Update Single commentaire"
 *    description: Update a single commentaire based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the commentaire"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: commentaire object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addcommentaire'
 *    responses:
 *      200:
 *        description: commentaire Updated
 *        schema:
 *            $ref: '#/definitions/Addcommentaires'
 *
 *
 *  delete:                                      #DELTE commentaire
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - commentaires
 *    summary: "Delete Single commentaire"
 *    description: Delete a single commentaire based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the commentaire"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addcommentaires"
 *    responses:
 *      200:
 *        description: commentaire Deleted
 *
 */

router.get('/', /* checkToken, */ getcommentaires);
/** POST /api/v1/users/register - Create new user */
router.post('/', addcommentaire);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getcommentaireById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletecommentaireById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatecommentaireById);

module.exports = router;
