const { generateHTML } = require('swagger-ui-express');
const {
  getsousFamilles,
  getsousFamilleById,
  addsousFamille,
  deletesousFamilleById,
  updatesousFamilleById,
} = require('./sousFamille.service');

/**
 * sousFamille controller
 */
module.exports = {
  /**
   * get list of sousFamilles
   * @param {Object} req
   * @param {Object} res
   */
  getsousFamilles: (req, res) => {
    getsousFamilles((err, results) => {
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
   * get sousFamille by id
   * @param {Object} req
   * @param {Object} res
   */
  getsousFamilleById: (req, res) => {
    const { id } = req.params;
    getsousFamilleById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de record avec ces info'
            : 'Invalide sousFamille',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new sousFamille record
   * @param {Object} req
   * @param {Object} res
   */
  addsousFamille: (req, res) => {
    const data = req.body;
    addsousFamille(data, (err, results) => {
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
   * delete sousFamille by id
   * @param {Object} req
   * @param {Object} res
   */
  deletesousFamilleById: (req, res) => {
    const id = req.params.id;
    deletesousFamilleById(id, (err, results) => {
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
   * update sousFamille info
   * @param {Object} req
   * @param {Object} res
   */
  updatesousFamilleById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatesousFamilleById(id, body, (err, results) => {
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
        message: 'sousFamille updated',
      });
    });
  },
};
