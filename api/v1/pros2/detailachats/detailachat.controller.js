const {
  getdetailachats,
  getdetailachatById,
  adddetailachat,
  deletedetailachatById,
  updatedetailachatById,
} = require('./detailachat.service');

/**
 * detailachat controller
 */
module.exports = {
  /**
   * get list of detailachats
   * @param {Object} req
   * @param {Object} res
   */
  getdetailachats: (req, res) => {
    getdetailachats((err, results) => {
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
   * get detailachat by id
   * @param {Object} req
   * @param {Object} res
   */
  getdetailachatById: (req, res) => {
    const { id } = req.params;
    getdetailachatById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de résultat avec ces infos'
            : 'detailachat invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new detailachat record
   * @param {Object} req
   * @param {Object} res
   */
  adddetailachat: (req, res) => {
    const data = req.body;
    adddetailachat(data, (err, results) => {
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
   * delete detailachat by id
   * @param {Object} req
   * @param {Object} res
   */
  deletedetailachatById: (req, res) => {
    const id = req.params.id;
    deletedetailachatById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `detailachat ${results}`,
      });
    });
  },
  /**
   * update detailachat info
   * @param {Object} req
   * @param {Object} res
   */
  updatedetailachatById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatedetailachatById(id, body, (err, results) => {
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
        message: 'detailachat updated',
      });
    });
  },
};
