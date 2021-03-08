const {
  getachats,
  getachatById,
  addachat,
  deleteachatById,
  updateachatById,
} = require('./achat.service');

/**
 * achat controller
 */
module.exports = {
  /**
   * get list of achats
   * @param {Object} req
   * @param {Object} res
   */
  getachats: (req, res) => {
    getachats((err, results) => {
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
   * get achat by id
   * @param {Object} req
   * @param {Object} res
   */
  getachatById: (req, res) => {
    const { id } = req.params;
    getachatById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de résultat avec ces infos' : 'achat invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new achat record
   * @param {Object} req
   * @param {Object} res
   */
  addachat: (req, res) => {
    const data = req.body;
    addachat(data, (err, results) => {
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
   * delete achat by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteachatById: (req, res) => {
    const id = req.params.id;
    deleteachatById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `achat ${results}`,
      });
    });
  },
  /**
   * update achat info
   * @param {Object} req
   * @param {Object} res
   */
  updateachatById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateachatById(id, body, (err, results) => {
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
        message: 'achat updated',
      });
    });
  },
};
