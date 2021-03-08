const { generateHTML } = require('swagger-ui-express');
const {
  getconditionfidelites,
  getconditionfideliteById,
  addconditionfidelite,
  deleteconditionfideliteById,
  updateconditionfideliteById,
} = require('./conditionfidelite.service');

/**
 * conditionfidelite controller
 */
module.exports = {
  /**
   * get list of conditionfidelites
   * @param {Object} req
   * @param {Object} res
   */
  getconditionfidelites: (req, res) => {
    getconditionfidelites((err, results) => {
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
   * get conditionfidelite by id
   * @param {Object} req
   * @param {Object} res
   */
  getconditionfideliteById: (req, res) => {
    const { id } = req.params;
    getconditionfideliteById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de record avec ces info'
            : 'Invalide conditionfidelite',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new conditionfidelite record
   * @param {Object} req
   * @param {Object} res
   */
  addconditionfidelite: (req, res) => {
    const data = req.body;
    addconditionfidelite(data, (err, results) => {
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
   * delete conditionfidelite by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteconditionfideliteById: (req, res) => {
    const id = req.params.id;
    deleteconditionfideliteById(id, (err, results) => {
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
   * update conditionfidelite info
   * @param {Object} req
   * @param {Object} res
   */
  updateconditionfideliteById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateconditionfideliteById(id, body, (err, results) => {
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
        message: 'conditionfidelite updated',
      });
    });
  },
};
