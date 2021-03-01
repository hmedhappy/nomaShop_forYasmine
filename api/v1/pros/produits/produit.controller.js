const { generateHTML } = require('swagger-ui-express');
const {
  getproduits,
  getproduitById,
  addproduit,
  deleteproduitById,
  updateproduitById,
} = require('./produit.service');

/**
 * produit controller
 */
module.exports = {
  /**
   * get list of produits
   * @param {Object} req
   * @param {Object} res
   */
  getproduits: (req, res) => {
    getproduits((err, results) => {
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
   * get produit by id
   * @param {Object} req
   * @param {Object} res
   */
  getproduitById: (req, res) => {
    const { id } = req.params;
    getproduitById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de record avec ces info' : 'Invalide produit',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new produit record
   * @param {Object} req
   * @param {Object} res
   */
  addproduit: (req, res) => {
    const data = req.body;
    addproduit(data, (err, results) => {
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
   * delete produit by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteproduitById: (req, res) => {
    const id = req.params.id;
    deleteproduitById(id, (err, results) => {
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
   * update produit info
   * @param {Object} req
   * @param {Object} res
   */
  updateproduitById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateproduitById(id, body, (err, results) => {
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
        message: 'produit updated',
      });
    });
  },
};
