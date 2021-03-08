const pool = require('../../../config/pool');

/**
 * detailachats services
 */
module.exports = {
  /**
   * get all detailachats list
   * @param {Function} callback
   */
  getdetailachats: (callback) => {
    pool.query(`SELECT * FROM detailachats`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get detailachat by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getdetailachatById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM detailachats
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
   * add detailachat
   * @param {Integer} data
   * @param {Function} callback
   */
  adddetailachat: (data, callback) => {
    pool.query(
      `INSERT INTO public.detailachats(
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
   * delete detailachat by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletedetailachatById: (id, callback) => {
    pool.query(
      `DELETE FROM public.detailachats
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
   * update detailachat by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatedetailachatById: (id, data, callback) => {
    pool.query(
      `UPDATE public.detailachats
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
