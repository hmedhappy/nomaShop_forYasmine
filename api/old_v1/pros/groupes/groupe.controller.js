const { generateHTML } = require('swagger-ui-express');
const {
  getgroupes,
  getgroupeById,
  addgroupe,
  deletegroupeById,
  updategroupeById,
} = require('./groupe.service');

/**
 * groupe controller
 */
module.exports = {
  /**
   * get list of groupes
   * @param {Object} req
   * @param {Object} res
   */
  getgroupes: (req, res) => {
    getgroupes((err, results) => {
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
   * get groupe by id
   * @param {Object} req
   * @param {Object} res
   */
  getgroupeById: (req, res) => {
    const { id } = req.params;
    getgroupeById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de record avec ces info' : 'Invalide groupe',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new groupe record
   * @param {Object} req
   * @param {Object} res
   */
  addgroupe: (req, res) => {
    const data = req.body;
    addgroupe(data, (err, results) => {
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
   * delete groupe by id
   * @param {Object} req
   * @param {Object} res
   */
  deletegroupeById: (req, res) => {
    const id = req.params.id;
    deletegroupeById(id, (err, results) => {
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
   * update groupe info
   * @param {Object} req
   * @param {Object} res
   */
  updategroupeById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updategroupeById(id, body, (err, results) => {
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
        message: 'groupe updated',
      });
    });
  },
};
