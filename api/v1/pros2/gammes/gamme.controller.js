const {
  getgammes,
  getgammeById,
  addgamme,
  deletegammeById,
  updategammeById,
} = require('./gamme.service');

/**
 * gamme controller
 */
module.exports = {
  /**
   * get list of gammes
   * @param {Object} req
   * @param {Object} res
   */
  getgammes: (req, res) => {
    getgammes((err, results) => {
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
   * get gamme by id
   * @param {Object} req
   * @param {Object} res
   */
  getgammeById: (req, res) => {
    const { id } = req.params;
    getgammeById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de résultat avec ces infos' : 'gamme invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new gamme record
   * @param {Object} req
   * @param {Object} res
   */
  addgamme: (req, res) => {
    const data = req.body;
    addgamme(data, (err, results) => {
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
   * delete gamme by id
   * @param {Object} req
   * @param {Object} res
   */
  deletegammeById: (req, res) => {
    const id = req.params.id;
    deletegammeById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `gamme ${results}`,
      });
    });
  },
  /**
   * update gamme info
   * @param {Object} req
   * @param {Object} res
   */
  updategammeById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updategammeById(id, body, (err, results) => {
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
        message: 'gamme updated',
      });
    });
  },
};
