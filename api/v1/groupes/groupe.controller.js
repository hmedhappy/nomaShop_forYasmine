const { generateHTML } = require('swagger-ui-express');
const {
  getGroupes,
  getGroupeById,
  addGroupe,
  deleteGroupeById,
  updateGroupeById,
} = require('./groupe.service');

/**
 * Groupe controller
 */
module.exports = {
  /**
   * get list of Groupes
   * @param {Object} req
   * @param {Object} res
   */
  getGroupes: (req, res) => {
    getGroupes((err, results) => {
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
   * get Groupe by id
   * @param {Object} req
   * @param {Object} res
   */
  getGroupeById: (req, res) => {
    const { id } = req.params;
    getGroupeById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: 'Invalide Groupe',
          error: err,
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new Groupe record
   * @param {Object} req
   * @param {Object} res
   */
  addGroupe: (req, res) => {
    const data = ({ code, libelle, type } = req.body);
    addGroupe(data, (err, results) => {
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
   * delete Groupe by id
   * @param {Object} req
   * @param {Object} res
   */
  deleteGroupeById: (req, res) => {
    const id = req.params.id;
    deleteGroupeById(id, (err, results) => {
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
   * update Groupe info
   * @param {Object} req
   * @param {Object} res
   */
  updateGroupeById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updateGroupeById(id, body, (err, results) => {
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
