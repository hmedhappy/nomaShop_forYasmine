const { generateHTML } = require('swagger-ui-express');
const {
  getAchats,
  getAchatById,
  addAchat,
  deleteAchatById,
  updateAchatById,
} = require('./achat.service');

/**
 * Achat controller
 */
module.exports = {
  /**
   * get list of Achats
   * @param {Object} req
   * @param {Object} res
   */
  getAchats: (req, res) => {
    getAchats((err, results) => {
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
   * get Achat by id
   * @param {Object} req
   * @param {Object} res
   */
  getAchatById: (req, res) => {
    const { id } = req.params;
    getAchatById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: 'Invalide Achat',
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
   * add new Achat record
   * @param {Object} req
   * @param {Object} res
   */
  addAchat: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addAchat(data, (err, results) => {
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
   * delete Achat by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteAchatById: (req, res) => {
    const id = req.params.id;
    deleteAchatById(id, (err, results) => {
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
   * update Achat info
   * @param {Object} req
   * @param {Object} res
   */
  updateAchatById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateAchatById(id, body, (err, results) => {
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
