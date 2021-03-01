const { generateHTML } = require('swagger-ui-express');
const {
  getgrossistes,
  getgrossisteById,
  addgrossiste,
  deletegrossisteById,
  updategrossisteById,
} = require('./grossiste.service');

/**
 * grossiste controller
 */
module.exports = {
  /**
   * get list of grossistes
   * @param {Object} req
   * @param {Object} res
   */
  getgrossistes: (req, res) => {
    getgrossistes((err, results) => {
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
   * get grossiste by id
   * @param {Object} req
   * @param {Object} res
   */
  getgrossisteById: (req, res) => {
    const { id } = req.params;
    getgrossisteById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de record avec ces info' : 'Invalide grossiste',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new grossiste record
   * @param {Object} req
   * @param {Object} res
   */
  addgrossiste: (req, res) => {
    const data = req.body;
    addgrossiste(data, (err, results) => {
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
   * delete grossiste by id
   * @param {Object} req
   * @param {Object} res
   */
  deletegrossisteById: (req, res) => {
    const id = req.params.id;
    deletegrossisteById(id, (err, results) => {
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
   * update grossiste info
   * @param {Object} req
   * @param {Object} res
   */
  updategrossisteById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updategrossisteById(id, body, (err, results) => {
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
        message: 'grossiste updated',
      });
    });
  },
};
