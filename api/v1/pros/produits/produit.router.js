const {
  getproduits,
  getproduitById,
  addproduit,
  deleteproduitById,
  updateproduitById,
} = require('./produit.controller');
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
 * /produits:                                 #GET ALL produits
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - produits
 *    summary: "Get produits"
 *    description: Returns a single produit based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single produit
 *
 *  post:                                       #CREATE produit
 *    tags:
 *      - produits
 *    summary: "Create produit"
 *    description: create a single produit
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: produit object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addproduit'
 *    responses:
 *      200:
 *        description: produit created
 *
 * /produits/{id}:                                 #UPDATE produit
 *  get:
 *    tags:
 *      - produits
 *    summary: "Get Single produit"
 *    description: Update a single produit based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the produit"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: produit Updated
 *        schema:
 *            $ref: '#/definitions/Addproduits'
 *
 *  patch:
 *    tags:
 *      - produits
 *    summary: "Update Single produit"
 *    description: Update a single produit based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the produit"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: produit object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Addproduit'
 *    responses:
 *      200:
 *        description: produit Updated
 *        schema:
 *            $ref: '#/definitions/Addproduits'
 *
 *
 *  delete:                                      #DELTE produit
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - produits
 *    summary: "Delete Single produit"
 *    description: Delete a single produit based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the produit"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Addproduits"
 *    responses:
 *      200:
 *        description: produit Deleted
 *
 */

router.get('/', /* checkToken, */ getproduits);
/** POST /api/v1/users/register - Create new user */
router.post('/', addproduit);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id' /* , checkToken */, getproduitById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deleteproduitById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updateproduitById);

module.exports = router;
