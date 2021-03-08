const { generateHTML } = require('swagger-ui-express');
const {
  getfournisseurs,
  getfournisseurById,
  addfournisseur,
  deletefournisseurById,
  updatefournisseurById,
} = require('./fournisseur.service');

/**
 * fournisseur controller
 */
module.exports = {
  /**
   * get list of fournisseurs
   * @param {Object} req
   * @param {Object} res
   */
  getfournisseurs: (req, res) => {
    getfournisseurs((err, results) => {
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
   * get fournisseur by id
   * @param {Object} req
   * @param {Object} res
   */
  getfournisseurById: (req, res) => {
    const { id } = req.params;
    getfournisseurById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de record avec ces info'
            : 'Invalide fournisseur',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new fournisseur record
   * @param {Object} req
   * @param {Object} res
   */
  addfournisseur: (req, res) => {
    const data = req.body;
    addfournisseur(data, (err, results) => {
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
   * delete fournisseur by id
   * @param {Object} req
   * @param {Object} res
   */
  deletefournisseurById: (req, res) => {
    const id = req.params.id;
    deletefournisseurById(id, (err, results) => {
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
   * update fournisseur info
   * @param {Object} req
   * @param {Object} res
   */
  updatefournisseurById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatefournisseurById(id, body, (err, results) => {
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
        message: 'fournisseur updated',
      });
    });
  },
};
