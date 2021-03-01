const { generateHTML } = require('swagger-ui-express');
const {
  getMarques,
  getMarqueById,
  addMarque,
  deleteMarqueById,
  updateMarqueById,
} = require('./marque.service');

/**
 * Marque controller
 */
module.exports = {
  /**
   * get list of Marques
   * @param {Object} req
   * @param {Object} res
   */
  getMarques: (req, res) => {
    getMarques((err, results) => {
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
   * get Marque by id
   * @param {Object} req
   * @param {Object} res
   */
  getMarqueById: (req, res) => {
    const { id } = req.params;
    getMarqueById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: 'Invalide Marque',
        });
      }
      return res.json({
        success: 1,
        data: !results ? 'Pas de record avec ces info' : 'Invalide Marque',
      });
    });
  },
  /**
   * add new Marque record
   * @param {Object} req
   * @param {Object} res
   */
  addMarque: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addMarque(data, (err, results) => {
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
   * delete Marque by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteMarqueById: (req, res) => {
    const id = req.params.id;
    deleteMarqueById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'records empty',
        });
      }
      return res.json(results);
    });
  },
  /**
   * update Marque info
   * @param {Object} req
   * @param {Object} res
   */
  updateMarqueById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateMarqueById(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      return res.json({
        message: 1,
        message: 'profile updated',
      });
    });
  },
};
