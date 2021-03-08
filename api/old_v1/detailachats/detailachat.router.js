const {
  getdetailachats,
  getdetailachatById,
  adddetailachat,
  deletedetailachatById,
  updatedetailachatById,
} = require('./detailachat.controller');
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


/** GET /api/v1/detailachats/ - Get all detailachats */

/**
 * @swagger
 * /detailachats:                                
 *  get:                                          #GET ALL detailachats
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - detailachats
 *    summary: "Get detailachats"
 *    description: Returns a single detailachat based on their id
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single detailachat
 */
router.get('/', /* checkToken, */ getdetailachats);

/** POST /api/v1/detailachats/ - Create new detailachat */

/** 
 * @swagger
 * /detailachats:
 *  post:                                            #CREATE detailachat
 *    tags:
 *      - detailachats
 *    summary: "Create detailachat"
 *    description: create a single detailachat
 *    produces:
 *      - application/json
 *    requestBody:
 *       description: detailachat object that needs to be added to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Adddetailachat'
 *    responses:
 *      200:
 *        description: detailachat created
 */
router.post('/', adddetailachat);

/** GET /api/v1/detailachats/:id - Get detailachat by id */

/** 
 * @swagger
 * /detailachats/{id}:                                 #GET SINGLE detailachat
 *  get:
 *    tags:
 *      - detailachats
 *    summary: "Get Single detailachat"
 *    description: Update a single detailachat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *    responses:
 *      200:
 *        description: detailachat Updated
 *        schema:
 *            $ref: '#/definitions/Adddetailachats'
 */
router.get('/:id' /* , checkToken */, getdetailachatById);

/** PATCH /api/v1/detailachats/:id - Update detailachat by id */

/** 
 * @swagger
 * /detailachats/{id}:      
 *  patch:                                             #UPDATE detailachat
 *    tags: 
 *      - detailachats
 *    summary: "Update Single detailachat"
 *    description: Update a single detailachat based on their data
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *    requestBody:
 *       description: detailachat object that needs to be updated to the system
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Adddetailachat'
 *    responses:
 *      200:
 *        description: detailachat Updated
 *        schema:
 *            $ref: '#/definitions/Adddetailachats'
 */
router.patch('/:id', updatedetailachatById);

/** DELETE /api/v1/detailachats/:id - Delete detailachat by id */

/** 
 * @swagger
 * /detailachats/{id}:
 *  delete:                                            #DELETE detailachat
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - detailachats
 *    summary: "Delete Single detailachat"
 *    description: Delete a single detailachat based on their ID
 *    produces:
 *      - application/json
 *    parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "The id of the detailachat"
 *       required: true
 *       type: "string"
 *       schema:
 *          $ref: "#/definitions/Adddetailachats"
 *    responses:
 *      200:
 *        description: detailachat Deleted
 *
 */
router.delete('/:id', deletedetailachatById);



module.exports = router;
