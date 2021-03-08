const { generateHTML } = require('swagger-ui-express');
const {
  getpermissions,
  getpermissionById,
  addpermission,
  deletepermissionById,
  updatepermissionById,
} = require('./permission.service');

/**
 * permission controller
 */
module.exports = {
  /**
   * get list of permissions
   * @param {Object} req
   * @param {Object} res
   */
  getpermissions: (req, res) => {
    getpermissions((err, results) => {
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
   * get permission by id
   * @param {Object} req
   * @param {Object} res
   */
  getpermissionById: (req, res) => {
    const { id } = req.params;
    getpermissionById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de record avec ces info'
            : 'Invalide permission',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new permission record
   * @param {Object} req
   * @param {Object} res
   */
  addpermission: (req, res) => {
    const data = req.body;
    addpermission(data, (err, results) => {
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
   * delete permission by id
   * @param {Object} req
   * @param {Object} res
   */
  deletepermissionById: (req, res) => {
    const id = req.params.id;
    deletepermissionById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `record ${results}`,
      });
    });
  },
  /**
   * update permission info
   * @param {Object} req
   * @param {Object} res
   */
  updatepermissionById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatepermissionById(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      return res.json({
        message: 1,
        message: 'permission updated',
      });
    });
  },
};
