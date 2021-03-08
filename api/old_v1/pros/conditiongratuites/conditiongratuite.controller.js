const { generateHTML } = require('swagger-ui-express');
const {
  getconditiongratuites,
  getconditiongratuiteById,
  addconditiongratuite,
  deleteconditiongratuiteById,
  updateconditiongratuiteById,
} = require('./conditiongratuite.service');

/**
 * conditiongratuite controller
 */
module.exports = {
  /**
   * get list of conditiongratuites
   * @param {Object} req
   * @param {Object} res
   */
  getconditiongratuites: (req, res) => {
    getconditiongratuites((err, results) => {
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
   * get conditiongratuite by id
   * @param {Object} req
   * @param {Object} res
   */
  getconditiongratuiteById: (req, res) => {
    const { id } = req.params;
    getconditiongratuiteById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results
            ? 'Pas de record avec ces info'
            : 'Invalide conditiongratuite',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new conditiongratuite record
   * @param {Object} req
   * @param {Object} res
   */
  addconditiongratuite: (req, res) => {
    const data = req.body;
    addconditiongratuite(data, (err, results) => {
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
   * delete conditiongratuite by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteconditiongratuiteById: (req, res) => {
    const id = req.params.id;
    deleteconditiongratuiteById(id, (err, results) => {
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
   * update conditiongratuite info
   * @param {Object} req
   * @param {Object} res
   */
  updateconditiongratuiteById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateconditiongratuiteById(id, body, (err, results) => {
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
        message: 'conditiongratuite updated',
      });
    });
  },
};
