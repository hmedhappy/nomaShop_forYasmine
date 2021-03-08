const {
  getgratuites,
  getgratuiteById,
  addgratuite,
  deletegratuiteById,
  updategratuiteById,
} = require('./gratuite.service');

/**
 * gratuite controller
 */
module.exports = {
  /**
   * get list of gratuites
   * @param {Object} req
   * @param {Object} res
   */
  getgratuites: (req, res) => {
    getgratuites((err, results) => {
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
   * get gratuite by id
   * @param {Object} req
   * @param {Object} res
   */
  getgratuiteById: (req, res) => {
    const { id } = req.params;
    getgratuiteById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de résultat avec ces infos'
            : 'gratuite invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new gratuite record
   * @param {Object} req
   * @param {Object} res
   */
  addgratuite: (req, res) => {
    const data = req.body;
    addgratuite(data, (err, results) => {
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
   * delete gratuite by id
   * @param {Object} req
   * @param {Object} res
   */
  deletegratuiteById: (req, res) => {
    const id = req.params.id;
    deletegratuiteById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `gratuite ${results}`,
      });
    });
  },
  /**
   * update gratuite info
   * @param {Object} req
   * @param {Object} res
   */
  updategratuiteById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updategratuiteById(id, body, (err, results) => {
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
        message: 'gratuite updated',
      });
    });
  },
};
