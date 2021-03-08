const pool = require('../../../config/pool');

/**
 * promotions services
 */
module.exports = {
  /**
   * get all promotions list
   * @param {Function} callback
   */
  getpromotions: (callback) => {
    pool.query(`SELECT * FROM promotions`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get promotion by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getpromotionById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM promotions
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
   * add promotion
   * @param {Integer} data
   * @param {Function} callback
   */
  addpromotion: (data, callback) => {
    pool.query(
      `INSERT INTO public.promotions(
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
   * delete promotion by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletepromotionById: (id, callback) => {
    pool.query(
      `DELETE FROM public.promotions
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
   * update promotion by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatepromotionById: (id, data, callback) => {
    pool.query(
      `UPDATE public.promotions
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
