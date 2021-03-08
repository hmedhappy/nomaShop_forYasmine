const {
  getRoles,
  getRoleById,
  addRole,
  deleteRoleById,
  updateRoleById,
} = require('./role.service');

/**
 * role controller
 */
module.exports = {
  /**
   * get list of roles
   * @param {Object} req
   * @param {Object} res
   */
  getRoles: (req, res) => {
    getRoles((err, results) => {
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
   * get role by id
   * @param {Object} req
   * @param {Object} res
   */
  getRoleById: (req, res) => {
    const { id } = req.params;
    getRoleById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de résultat avec ces infos' : 'Role invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new role record
   * @param {Object} req
   * @param {Object} res
   */
  addRole: (req, res) => {
    const data = req.body;
    addRole(data, (err, results) => {
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
   * delete role by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteRoleById: (req, res) => {
    const id = req.params.id;
    deleteRoleById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `role ${results}`,
      });
    });
  },
  /**
   * update role info
   * @param {Object} req
   * @param {Object} res
   */
  updateRoleById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateRoleById(id, body, (err, results) => {
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
        message: 'role updated',
      });
    });
  },
};
