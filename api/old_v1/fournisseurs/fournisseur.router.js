const {
  getfournisseurs,
  getfournisseurById,
  addfournisseur,
  deletefournisseurById,
  updatefournisseurById,
} = require('./fournisseur.controller');
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
 * /fournisseurs:                                 #GET ALL fournisseurs
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fournisseurs
 *    summary: "Get fournisseurs"
 *    description: Returns a single fournisseur based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single fournisseur
 *
 *  post:                                       #CREATE fournisseur
 *    tags:
 *      - fournisseurs
 *    summary: "Create fournisseur"
 *    description: create a single fournisseur
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: fournisseur object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfournisseur'
 *    responses:
 *      200:
 *        description: fournisseur created
 *
 * /fournisseurs/{id}:                                 #UPDATE fournisseur
 *  get:
 *    tags:
 *      - fournisseurs
 *    summary: "Get Single fournisseur"
 *    description: Update a single fournisseur based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fournisseur"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: fournisseur Updated
 *        schema:
 *            $ref: '#/definitions/Addfournisseurs'
 *
 *  patch:
 *    tags:
 *      - fournisseurs
 *    summary: "Update Single fournisseur"
 *    description: Update a single fournisseur based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fournisseur"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: fournisseur object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addfournisseur'
 *    responses:
 *      200:
 *        description: fournisseur Updated
 *        schema:
 *            $ref: '#/definitions/Addfournisseurs'
 *
 *
 *  delete:                                      #DELTE fournisseur
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - fournisseurs
 *    summary: "Delete Single fournisseur"
 *    description: Delete a single fournisseur based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the fournisseur"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addfournisseurs"
 *    responses:
 *      200:
 *        description: fournisseur Deleted
 *
 */

router.get('/', /* checkToken, */ getfournisseurs);
/** POST /api/v1/users/register - Create new user */
router.post('/', addfournisseur);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getfournisseurById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deletefournisseurById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updatefournisseurById);

module.exports = router;
