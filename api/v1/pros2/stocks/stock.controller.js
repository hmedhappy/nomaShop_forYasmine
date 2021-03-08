const {
  getstocks,
  getstockById,
  addstock,
  deletestockById,
  updatestockById,
} = require('./stock.service');

/**
 * stock controller
 */
module.exports = {
  /**
   * get list of stocks
   * @param {Object} req
   * @param {Object} res
   */
  getstocks: (req, res) => {
    getstocks((err, results) => {
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
   * get stock by id
   * @param {Object} req
   * @param {Object} res
   */
  getstockById: (req, res) => {
    const { id } = req.params;
    getstockById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'Pas de résultat avec ces infos' : 'stock invalide',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * add new stock record
   * @param {Object} req
   * @param {Object} res
   */
  addstock: (req, res) => {
    const data = req.body;
    addstock(data, (err, results) => {
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
   * delete stock by id
   * @param {Object} req
   * @param {Object} res
   */
  deletestockById: (req, res) => {
    const id = req.params.id;
    deletestockById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          data: err.detail,
        });
      }
      return res.json({
        success: 1,
        message: `stock ${results}`,
      });
    });
  },
  /**
   * update stock info
   * @param {Object} req
   * @param {Object} res
   */
  updatestockById: (req, res) => {
    const { id } = req.params;
    const body = req.body;
    updatestockById(id, body, (err, results) => {
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
        message: 'stock updated',
      });
    });
  },
};
