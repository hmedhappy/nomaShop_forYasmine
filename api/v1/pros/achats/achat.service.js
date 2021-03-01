const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * achats services
 */
module.exports = {
  /**
   * get all achats list
   * @param {Function} callback
   */
  getachats: (callback) => {
    pool.query(`SELECT * FROM achats`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get achat by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getachatById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM achats
      WHERE id = $1`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results.rows[0]);
      }
    );
  },
  /**
   * add achat
   * @param {Integer} data
   * @param {Function} callback
   */
  addachat: (data, callback) => {
    pool.query(
      `INSERT INTO public.achats(
        ${Object.keys(data).map((key) => key)})
      VALUES (${Object.keys(data).map((key) => `'${data[key]}'`)});
    `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results.rows);
      }
    );
  },
  /**
   * delete achat by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteachatById: (id, callback) => {
    pool.query(
      `DELETE FROM public.achats
      WHERE id=${id};`,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results.rowCount ? 'Deleted' : 'Not Found');
      }
    );
  },
  /**
   * update achat by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateachatById: (id, data, callback) => {
    pool.query(
      `UPDATE public.achats
	SET ${Object.keys(data).map((key) => `${key}='${data[key]}'`)}
	WHERE id=${id};`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
