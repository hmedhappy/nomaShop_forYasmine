const {
  getcommentaires,
  getcommentaireById,
  addcommentaire,
  deletecommentaireById,
  updatecommentaireById,
} = require('./commentaire.service');

/**
 * commentaire controller
 */
module.exports = {
  /**
   * get list of commentaires
   * @param {Object} req
   * @param {Object} res
   */
  getcommentaires: (req, res) => {
    getcommentaires((err, results) => {
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
   * get commentaire by id
   * @param {Object} req
   * @param {Object} res
   */
  getcommentaireById: (req, res) => {
    const { id } = req.params;
    getcommentaireById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de résultat avec ces infos'
            : 'commentaire invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new commentaire record
   * @param {Object} req
   * @param {Object} res
   */
  addcommentaire: (req, res) => {
    const data = req.body;
    addcommentaire(data, (err, results) => {
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
   * delete commentaire by id
   * @param {Object} req
   * @param {Object} res
   */
  deletecommentaireById: (req, res) => {
    const id = req.params.id;
    deletecommentaireById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `commentaire ${results}`,
      });
    });
  },
  /**
   * update commentaire info
   * @param {Object} req
   * @param {Object} res
   */
  updatecommentaireById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatecommentaireById(id, body, (err, results) => {
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
        message: 'commentaire updated',
      });
    });
  },
};
