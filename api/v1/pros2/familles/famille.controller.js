const {
  getfamilles,
  getfamilleById,
  addfamille,
  deletefamilleById,
  updatefamilleById,
} = require('./famille.service');

/**
 * famille controller
 */
module.exports = {
  /**
   * get list of familles
   * @param {Object} req
   * @param {Object} res
   */
  getfamilles: (req, res) => {
    getfamilles((err, results) => {
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
   * get famille by id
   * @param {Object} req
   * @param {Object} res
   */
  getfamilleById: (req, res) => {
    const { id } = req.params;
    getfamilleById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de résultat avec ces infos'
            : 'famille invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new famille record
   * @param {Object} req
   * @param {Object} res
   */
  addfamille: (req, res) => {
    const data = req.body;
    addfamille(data, (err, results) => {
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
   * delete famille by id
   * @param {Object} req
   * @param {Object} res
   */
  deletefamilleById: (req, res) => {
    const id = req.params.id;
    deletefamilleById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `famille ${results}`,
      });
    });
  },
  /**
   * update famille info
   * @param {Object} req
   * @param {Object} res
   */
  updatefamilleById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatefamilleById(id, body, (err, results) => {
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
        message: 'famille updated',
      });
    });
  },
};
