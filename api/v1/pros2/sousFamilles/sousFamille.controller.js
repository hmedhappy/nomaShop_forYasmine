const {
  getsousfamilles,
  getsousfamilleById,
  addsousfamille,
  deletesousfamilleById,
  updatesousfamilleById,
} = require('./sousFamille.service');

/**
 * sousfamille controller
 */
module.exports = {
  /**
   * get list of sousfamilles
   * @param {Object} req
   * @param {Object} res
   */
  getsousfamilles: (req, res) => {
    getsousfamilles((err, results) => {
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
   * get sousfamille by id
   * @param {Object} req
   * @param {Object} res
   */
  getsousfamilleById: (req, res) => {
    const { id } = req.params;
    getsousfamilleById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de résultat avec ces infos'
            : 'sousfamille invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new sousfamille record
   * @param {Object} req
   * @param {Object} res
   */
  addsousfamille: (req, res) => {
    const data = req.body;
    addsousfamille(data, (err, results) => {
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
   * delete sousfamille by id
   * @param {Object} req
   * @param {Object} res
   */
  deletesousfamilleById: (req, res) => {
    const id = req.params.id;
    deletesousfamilleById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `sousfamille ${results}`,
      });
    });
  },
  /**
   * update sousfamille info
   * @param {Object} req
   * @param {Object} res
   */
  updatesousfamilleById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatesousfamilleById(id, body, (err, results) => {
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
        message: 'sousfamille updated',
      });
    });
  },
};
