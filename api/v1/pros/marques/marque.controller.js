const { generateHTML } = require('swagger-ui-express');
const {
  getmarques,
  getmarqueById,
  addmarque,
  deletemarqueById,
  updatemarqueById,
} = require('./marque.service');

/**
 * marque controller
 */
module.exports = {
  /**
   * get list of marques
   * @param {Object} req
   * @param {Object} res
   */
  getmarques: (req, res) => {
    getmarques((err, results) => {
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
   * get marque by id
   * @param {Object} req
   * @param {Object} res
   */
  getmarqueById: (req, res) => {
    const { id } = req.params;
    getmarqueById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de record avec ces info' : 'Invalide marque',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new marque record
   * @param {Object} req
   * @param {Object} res
   */
  addmarque: (req, res) => {
    const data = req.body;
    addmarque(data, (err, results) => {
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
   * delete marque by id
   * @param {Object} req
   * @param {Object} res
   */
  deletemarqueById: (req, res) => {
    const id = req.params.id;
    deletemarqueById(id, (err, results) => {
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
   * update marque info
   * @param {Object} req
   * @param {Object} res
   */
  updatemarqueById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatemarqueById(id, body, (err, results) => {
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
        message: 'marque updated',
      });
    });
  },
};
