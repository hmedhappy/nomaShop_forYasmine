const { generateHTML } = require('swagger-ui-express');
const {
  getGrossistes,
  getGrossisteById,
  addGrossiste,
  deleteGrossisteById,
  updateGrossisteById,
} = require('./grossiste.service');

/**
 * Grossiste controller
 */
module.exports = {
  /**
   * get list of Grossistes
   * @param {Object} req
   * @param {Object} res
   */
  getGrossistes: (req, res) => {
    getGrossistes((err, results) => {
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
   * get Grossiste by id
   * @param {Object} req
   * @param {Object} res
   */
  getGrossisteById: (req, res) => {
    const { id } = req.params;
    getGrossisteById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: 'Invalide Grossiste',
          error: err,
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new Grossiste record
   * @param {Object} req
   * @param {Object} res
   */
  addGrossiste: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addGrossiste(data, (err, results) => {
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
   * delete Grossiste by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteGrossisteById: (req, res) => {
    const id = req.params.id;
    deleteGrossisteById(id, (err, results) => {
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
   * update Grossiste info
   * @param {Object} req
   * @param {Object} res
   */
  updateGrossisteById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateGrossisteById(id, body, (err, results) => {
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
