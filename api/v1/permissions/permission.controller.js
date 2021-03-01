const { generateHTML } = require('swagger-ui-express');
const {
  getPermissions,
  getPermissionById,
  addPermission,
  deletePermissionById,
  updatePermissionById,
} = require('./permission.service');

/**
 * Permission controller
 */
module.exports = {
  /**
   * get list of Permissions
   * @param {Object} req
   * @param {Object} res
   */
  getPermissions: (req, res) => {
    getPermissions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results.rows,
      });
    });
  },
  /**
   * get Permission by id
   * @param {Object} req
   * @param {Object} res
   */
  getPermissionById: (req, res) => {
    const { id } = req.params;
    getPermissionById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de record avec ces info'
            : 'Invalide Permission',
        });
      }
      return res.json({
        success: 1,
        data: 'Permissions fetched',
      });
    });
  },
  /**
   * add new Permission record
   * @param {Object} req
   * @param {Object} res
   */
  addPermission: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addPermission(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  /**
   * delete Permission by id
   * @param {Object} req
   * @param {Object} res
   */
  deletePermissionById: (req, res) => {
    const id = req.params.id;
    deletePermissionById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'records empty',
        });
      }
      return res.json(results);
    });
  },
  /**
   * update Permission info
   * @param {Object} req
   * @param {Object} res
   */
  updatePermissionById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatePermissionById(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      return res.json({
        message: 1,
        message: 'profile updated',
      });
    });
  },
};
