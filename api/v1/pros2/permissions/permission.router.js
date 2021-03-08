const {
  getpermissions,
  getpermissionById,
  addpermission,
  deletepermissionById,
  updatepermissionById,
} = require('./permission.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();

/** GET /api/v1/permissions/- Get all permissions */
/**
 * @swagger
 * /permissions:
 *  get:                                     #GET ALL permissions
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
 */
router.get('/', /* checkToken ,*/ getpermissions);

/** POST /api/v1/permissions/ - Create new permission */
/**
 * @swagger
 * /permissions:
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
 */
router.post('/', addpermission);

/** GET /api/v1/permissions/:id - Get single permission by id */
/**
 *  @swagger
 * /permissions/{id}:
 *  get:                                            #GET SINGLE permission
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
 *            $ref: '#/definitions/Addpermission'
 */
router.get('/:id', checkToken, getpermissionById);

/** PATCH /api/v1/permissions/:id - Update permission by id */
/**
 * @swagger
 * /permissions/{id}:
 *  patch:                                           #UPDATE permission
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
 *            $ref: '#/definitions/Addpermission'
 */
router.patch('/:id', updatepermissionById);

/** DELETE /api/v1/permissions/:id - Delete permission by id */
/**
 * @swagger
 * /permissions/{id}:
 *  delete:                                     #DELETE SINGLE permission
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
 *          $ref: "#/definitions/Addpermission"
 *    responses:
 *      200:
 *        description: permission Deleted
 */
router.delete('/:id', deletepermissionById);

module.exports = router;
