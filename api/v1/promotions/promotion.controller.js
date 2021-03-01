const { generateHTML } = require('swagger-ui-express');
const {
  getpromotions,
  getpromotionById,
  addpromotion,
  deletepromotionById,
  updatepromotionById,
} = require('./promotion.service');

/**
 * promotion controller
 */
module.exports = {
  /**
   * get list of promotions
   * @param {Object} req
   * @param {Object} res
   */
  getpromotions: (req, res) => {
    getpromotions((err, results) => {
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
   * get promotion by id
   * @param {Object} req
   * @param {Object} res
   */
  getpromotionById: (req, res) => {
    const { id } = req.params;
    getpromotionById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de record avec ces info' : 'Invalide promotion',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new promotion record
   * @param {Object} req
   * @param {Object} res
   */
  addpromotion: (req, res) => {
    const data = req.body;
    addpromotion(data, (err, results) => {
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
   * delete promotion by id
   * @param {Object} req
   * @param {Object} res
   */
  deletepromotionById: (req, res) => {
    const id = req.params.id;
    deletepromotionById(id, (err, results) => {
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
   * update promotion info
   * @param {Object} req
   * @param {Object} res
   */
  updatepromotionById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatepromotionById(id, body, (err, results) => {
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
        message: 'promotion updated',
      });
    });
  },
};
