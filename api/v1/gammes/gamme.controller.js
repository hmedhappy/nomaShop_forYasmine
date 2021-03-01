const { generateHTML } = require('swagger-ui-express');
const {
  getGammes,
  getGammeById,
  addGamme,
  deleteGammeById,
  updateGammeById,
} = require('./gamme.service');

/**
 * Gamme controller
 */
module.exports = {
  /**
   * get list of Gammes
   * @param {Object} req
   * @param {Object} res
   */
  getGammes: (req, res) => {
    getGammes((err, results) => {
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
   * get Gamme by id
   * @param {Object} req
   * @param {Object} res
   */
  getGammeById: (req, res) => {
    const { id } = req.params;
    getGammeById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: 'Invalide Gamme',
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
   * add new Gamme record
   * @param {Object} req
   * @param {Object} res
   */
  addGamme: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addGamme(data, (err, results) => {
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
   * delete Gamme by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteGammeById: (req, res) => {
    const id = req.params.id;
    deleteGammeById(id, (err, results) => {
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
   * update Gamme info
   * @param {Object} req
   * @param {Object} res
   */
  updateGammeById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateGammeById(id, body, (err, results) => {
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
