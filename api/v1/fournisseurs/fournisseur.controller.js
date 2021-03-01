const { generateHTML } = require('swagger-ui-express');
const {
  getFournisseurs,
  getFournisseurById,
  addFournisseur,
  deleteFournisseurById,
  updateFournisseurById,
} = require('./fournisseur.service');

/**
 * Fournisseur controller
 */
module.exports = {
  /**
   * get list of Fournisseurs
   * @param {Object} req
   * @param {Object} res
   */
  getFournisseurs: (req, res) => {
    getFournisseurs((err, results) => {
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
   * get Fournisseur by id
   * @param {Object} req
   * @param {Object} res
   */
  getFournisseurById: (req, res) => {
    const { id } = req.params;
    getFournisseurById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de record avec ces info'
            : 'Invalide Fournisseur',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new Fournisseur record
   * @param {Object} req
   * @param {Object} res
   */
  addFournisseur: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addFournisseur(data, (err, results) => {
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
   * delete Fournisseur by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteFournisseurById: (req, res) => {
    const id = req.params.id;
    deleteFournisseurById(id, (err, results) => {
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
   * update Fournisseur info
   * @param {Object} req
   * @param {Object} res
   */
  updateFournisseurById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateFournisseurById(id, body, (err, results) => {
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
