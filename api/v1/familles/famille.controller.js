const { generateHTML } = require('swagger-ui-express');
const {
  getFamilles,
  getFamilleById,
  addFamille,
  deleteFamilleById,
  updateFamilleById,
} = require('./famille.service');

/**
 * Famille controller
 */
module.exports = {
  /**
   * get list of Familles
   * @param {Object} req
   * @param {Object} res
   */
  getFamilles: (req, res) => {
    getFamilles((err, results) => {
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
   * get Famille by id
   * @param {Object} req
   * @param {Object} res
   */
  getFamilleById: (req, res) => {
    const { id } = req.params;
    getFamilleById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: 'Invalide Famille',
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
   * add new Famille record
   * @param {Object} req
   * @param {Object} res
   */
  addFamille: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addFamille(data, (err, results) => {
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
   * delete Famille by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteFamilleById: (req, res) => {
    const id = req.params.id;
    deleteFamilleById(id, (err, results) => {
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
   * update Famille info
   * @param {Object} req
   * @param {Object} res
   */
  updateFamilleById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateFamilleById(id, body, (err, results) => {
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
