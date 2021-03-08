const { generateHTML } = require('swagger-ui-express');
const {
  getfidelites,
  getfideliteById,
  addfidelite,
  deletefideliteById,
  updatefideliteById,
} = require('./fidelite.service');

/**
 * fidelite controller
 */
module.exports = {
  /**
   * get list of fidelites
   * @param {Object} req
   * @param {Object} res
   */
  getfidelites: (req, res) => {
    getfidelites((err, results) => {
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
   * get fidelite by id
   * @param {Object} req
   * @param {Object} res
   */
  getfideliteById: (req, res) => {
    const { id } = req.params;
    getfideliteById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de record avec ces info' : 'Invalide fidelite',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new fidelite record
   * @param {Object} req
   * @param {Object} res
   */
  addfidelite: (req, res) => {
    const data = req.body;
    addfidelite(data, (err, results) => {
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
   * delete fidelite by id
   * @param {Object} req
   * @param {Object} res
   */
  deletefideliteById: (req, res) => {
    const id = req.params.id;
    deletefideliteById(id, (err, results) => {
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
   * update fidelite info
   * @param {Object} req
   * @param {Object} res
   */
  updatefideliteById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatefideliteById(id, body, (err, results) => {
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
        message: 'fidelite updated',
      });
    });
  },
};
