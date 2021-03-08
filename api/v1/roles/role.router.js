const {
  getRoles,
  getRoleById,
  addRole,
  deleteRoleById,
  updateRoleById,
} = require('./Role.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();


/** GET /api/v1/roles/- Get all roles */
/**
 * @swagger
 * /roles:                                 
 *  get:                                     #GET ALL roles
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
 */
router.get('/', /* checkToken ,*/ getRoles);

/** POST /api/v1/roles/ - Create new role */
/**
 * @swagger
 * /roles:
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
 */
router.post('/', addRole);

/** GET /api/v1/roles/:id - Get single role by id */
/**
 *  @swagger
 * /roles/{id}:                                 
 *  get:                                            #GET SINGLE role
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
 *            $ref: '#/definitions/Addrole'
 */
router.get('/:id', checkToken, getRoleById);

/** PATCH /api/v1/roles/:id - Update role by id */
/**
 * @swagger
 * /roles/{id}:                                
 *  patch:                                           #UPDATE role                 
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
 *            $ref: '#/definitions/Addrole'
 */
router.patch('/:id', updateRoleById);

/** DELETE /api/v1/roles/:id - Delete role by id */
/** 
 * @swagger
 * /roles/{id}:                                 
 *  delete:                                     #DELETE SINGLE role
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
 *          $ref: "#/definitions/Addrole"
 *    responses:
 *      200:
 *        description: role Deleted
 */
router.delete('/:id', deleteRoleById);



module.exports = router;
