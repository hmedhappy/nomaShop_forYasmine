const {
  getProduits,
  getProduitById,
  addProduit,
  deleteProduitById,
  updateProduitById,
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
  getProduits: (req, res) => {
    getProduits((err, results) => {
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
  getProduitById: (req, res) => {
    const { id } = req.params;
    getProduitById(id, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (err || !results) {
        return res.json({
          success: 0,
          data: !results ? 'Pas de record avec ces info' : 'Invalide Produits',
        });
      }
      return res.json({
        success: 1,
        results,
      });
    });
  },
  /**
   * add new produit record
   * @param {Object} req
   * @param {Object} res
   */
  addProduit: (req, res) => {
    const data = req.body;
    addProduit(data, (err, results) => {
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
  deleteProduitById: (req, res) => {
    const id = req.params.id;
    deleteProduitById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'records empty' : err.detail,
        });
      }
      return res.json(results);
    });
  },
  /**
   * update produit info
   * @param {Object} req
   * @param {Object} res
   */
  updateProduitById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateProduitById(id, body, (err, results) => {
      console.log(err);

      if (err || !results) {
        return res.json({
          success: 0,
          message: !results ? 'Pas de record avec ces infos' : err.detail,
        });
      }
      return res.json({
        success: 1,
        message: 'profile updated',
      });
    });
  },
};
